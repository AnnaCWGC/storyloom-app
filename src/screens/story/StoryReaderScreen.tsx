import { useMemo, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { mockStories } from '../../data/mockStories';
import { useAppDispatch } from '../../store/hooks';
import { registerChoice, saveProgress } from '../../store/slices/storyProgressSlice';
import { theme } from '../../theme';

export function StoryReaderScreen({ route }: any) {
  const { storyId, chapterId } = route.params;

  const story = mockStories.find(item => item.id === storyId);
  const chapter = story?.chapters.find(item => item.id === chapterId);

  const [currentSceneId, setCurrentSceneId] = useState(chapter?.scenes[0]?.id);
  const dispatch = useAppDispatch();

  const currentScene = useMemo(() => {
    return chapter?.scenes.find(scene => scene.id === currentSceneId);
  }, [chapter, currentSceneId]);

  if (!story || !chapter || !currentScene) {
    return (
      <ScreenContainer>
        <View style={styles.content}>
          <Text style={styles.title}>Cena não encontrada</Text>
        </View>
      </ScreenContainer>
    );
  }

  function goToNextScene() {
    if (currentScene?.nextSceneId) {
      setCurrentSceneId(currentScene.nextSceneId);
    }
  }

  function handleChoicePress(choice: any) {
    dispatch(
      registerChoice({
        storyId,
        chapterId,
        sceneId: currentScene.id,
        choiceId: choice.id,
        relationshipTarget: choice.effect?.target,
        relationshipValue: choice.effect?.value,
      }),
    );

    dispatch(
      saveProgress({
        storyId,
        chapterId,
        sceneId: choice.nextSceneId,
        progress: 0.2,
      }),
    );

    setCurrentSceneId(choice.nextSceneId);
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>

        <View style={styles.dialogueBox}>
          {currentScene.speaker ? <Text style={styles.speaker}>{currentScene.speaker}</Text> : null}

          <Text style={styles.dialogueText}>{currentScene.text}</Text>

          {currentScene.choices?.map(choice => (
            <Pressable
              key={choice.id}
              style={[styles.choiceButton, choice.isPremium && styles.premiumChoice]}
              onPress={() => handleChoicePress(choice)}
            >
              <Text style={[styles.choiceText, choice.isPremium && styles.premiumChoiceText]}>
                {choice.isPremium ? `💎 ${choice.cost}  ` : ''}
                {choice.text}
              </Text>
            </Pressable>
          ))}

          {!currentScene.choices?.length && currentScene.nextSceneId ? (
            <Pressable style={styles.nextButton} onPress={goToNextScene}>
              <Text style={styles.nextText}>Continuar</Text>
            </Pressable>
          ) : null}

          {!currentScene.choices?.length && !currentScene.nextSceneId ? (
            <Text style={styles.endText}>Fim do capítulo</Text>
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'flex-end',
  },
  chapterTitle: {
    position: 'absolute',
    top: 64,
    alignSelf: 'center',
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '600',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  dialogueBox: {
    backgroundColor: 'rgba(26, 22, 37, 0.96)',
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xxl,
  },
  speaker: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  dialogueText: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  choiceButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceElevated,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  premiumChoice: {
    borderColor: theme.colors.secondary,
    backgroundColor: 'rgba(244, 114, 182, 0.12)',
  },
  choiceText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
  },
  premiumChoiceText: {
    color: theme.colors.secondary,
    fontWeight: '700',
  },
  nextButton: {
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  nextText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  endText: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontSize: theme.typography.small,
  },
});
