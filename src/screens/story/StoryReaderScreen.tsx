import { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ReaderTopBar } from '../../components/reader/ReaderTopBar';
import { DialogueBox } from '../../components/reader/DialogueBox';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { useStory } from '../../hooks/useStory';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { theme } from '../../theme';
import { StoryChoice } from '../../types/story';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { spendDiamonds } from '../../store/slices/userSlice';

export function StoryReaderScreen({ route, navigation }: any) {
  const { storyId, chapterId } = route.params;

  const dispatch = useAppDispatch();
  const { story, loading, error } = useStory(storyId);

  const user = useAppSelector(state => state.user);
  const diamonds = user?.diamonds ?? 0;
  const {
    getStoryProgress,
    saveStoryProgress,
    registerStoryChoice,
  } = useStoryProgress();
  const savedProgress = getStoryProgress(storyId);

  const chapter = useMemo(() => {
    return story?.chapters.find(item => item.id === chapterId);
  }, [story, chapterId]);

  const [currentSceneId, setCurrentSceneId] = useState<string | undefined>();
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chapter) return;

    const initialSceneId =
      savedProgress?.chapterId === chapterId
        ? savedProgress.sceneId
        : chapter.scenes[0]?.id;

    setCurrentSceneId(initialSceneId);
  }, [chapter, chapterId, savedProgress?.chapterId, savedProgress?.sceneId]);

  const currentScene = useMemo(() => {
    return chapter?.scenes.find(scene => scene.id === currentSceneId);
  }, [chapter, currentSceneId]);

  const currentSceneIndex = useMemo(() => {
    return chapter?.scenes.findIndex(scene => scene.id === currentSceneId) ?? 0;
  }, [chapter, currentSceneId]);

  const currentProgress = useMemo(() => {
    if (!chapter?.scenes.length) return 0;

    return Math.min(1, (currentSceneIndex + 1) / chapter.scenes.length);
  }, [chapter, currentSceneIndex]);

  function getSceneProgress(sceneId: string) {
    if (!chapter?.scenes.length) return 0;

    const sceneIndex = chapter.scenes.findIndex(scene => scene.id === sceneId);

    if (sceneIndex < 0) return currentProgress;

    return Math.min(1, (sceneIndex + 1) / chapter.scenes.length);
  }

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <LoadingState message="Loading chapter..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <ErrorState message={error} />
      </View>
    );
  }

  if (!story || !chapter || !currentScene) {
    return (
      <View style={styles.emptyContainer}>
        <ErrorState message="Chapter scene not found." />
      </View>
    );
  }

  const scene = currentScene;

  async function persistProgress(nextSceneId: string) {
    await saveStoryProgress({
      storyId,
      chapterId,
      sceneId: nextSceneId,
      progress: getSceneProgress(nextSceneId),
    });
  }

  async function handleGoToScene(nextSceneId: string) {
    await persistProgress(nextSceneId);
    setCurrentSceneId(nextSceneId);
  }

  async function handleChoicePress(choice: StoryChoice) {
    if (choice.isPremium) {
      const cost = choice.cost ?? 0;

      if (diamonds < cost) {
        setFeedbackMessage('Você não tem diamantes suficientes para essa escolha.');
        return;
      }

      dispatch(spendDiamonds(cost));
    }

    await registerStoryChoice({
      storyId,
      chapterId,
      sceneId: scene.id,
      choiceId: choice.id,
      relationshipTarget: choice.effect?.target,
      relationshipValue: choice.effect?.value,
    });

    if (choice.effect?.message) {
      setFeedbackMessage(choice.effect.message);
    } else {
      setFeedbackMessage(null);
    }

    await handleGoToScene(choice.nextSceneId);
  }

  async function handleContinue() {
    if (!scene.nextSceneId) return;

    setFeedbackMessage(null);
    await handleGoToScene(scene.nextSceneId);
  }

  function handleBack() {
    navigation.goBack();
  }

  async function handleEndChapter() {
    if (scene) {
      await saveStoryProgress({
        storyId,
        chapterId,
        sceneId: scene.id,
        progress: 1,
      });
    }

    navigation.navigate('App');
  }

  const canContinue = Boolean(
    !scene.choices?.length && scene.nextSceneId,
  );

  const isEnd = Boolean(
    !scene.choices?.length && !scene.nextSceneId,
  );

  return (
    <ImageBackground
      source={scene.backgroundImage || story.bannerImage}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          'rgba(15,13,22,0.20)',
          'rgba(15,13,22,0.36)',
          'rgba(15,13,22,0.82)',
          theme.colors.background,
        ]}
        locations={[0, 0.42, 0.78, 1]}
        style={styles.overlay}
      />

      <ReaderTopBar
        chapterTitle={chapter.title}
        diamonds={diamonds}
        progress={currentProgress}
        onBack={handleBack}
      />

      <View style={styles.content}>
        {feedbackMessage ? (
          <View style={styles.feedbackPill}>
            <Text style={styles.feedbackText}>{feedbackMessage}</Text>
          </View>
        ) : null}

        <DialogueBox
          speaker={scene.speaker}
          text={scene.text}
          choices={scene.choices}
          canContinue={canContinue}
          isEnd={isEnd}
          onChoicePress={handleChoicePress}
          onContinue={handleContinue}
          onEnd={handleEndChapter}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: 48,
    justifyContent: 'flex-end',
  },
  feedbackPill: {
    alignSelf: 'center',
    maxWidth: '94%',
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(26,22,37,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.28)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  feedbackText: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xxl,
    justifyContent: 'center',
  },
});
