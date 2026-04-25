import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ReaderTopBar } from '../../components/reader/ReaderTopBar';
import { DialogueBox } from '../../components/reader/DialogueBox';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { useStoryReader } from '../../hooks/useStoryReader';
import { theme } from '../../theme';

export function StoryReaderScreen({ route, navigation }: any) {
  const { storyId, chapterId } = route.params;

  const {
    story,
    chapter,
    currentScene,

    loading,
    error,

    diamonds,
    currentProgress,
    feedbackMessage,

    canContinue,
    isEnd,

    handleChoicePress,
    handleContinue,
    finishChapter,
  } = useStoryReader({
    storyId,
    chapterId,
  });

  function handleBack() {
    navigation.goBack();
  }

  async function handleEndChapter() {
    await finishChapter();
    navigation.navigate('App');
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

  return (
    <ImageBackground
      source={currentScene.backgroundImage || story.bannerImage}
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
          speaker={currentScene.speaker}
          text={currentScene.text}
          choices={currentScene.choices}
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
