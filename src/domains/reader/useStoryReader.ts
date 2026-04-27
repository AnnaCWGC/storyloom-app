import { useCallback, useEffect, useMemo, useState } from 'react';

import { StoryChoice, useStory } from '@/domains/stories';
import { useStoryProgress } from '@/domains/progress';
import { useWallet } from '@/domains/wallet';

type UseStoryReaderParams = {
  storyId: string;
  chapterId: string;
};

export function useStoryReader({
  storyId,
  chapterId,
}: UseStoryReaderParams) {
  const { story, loading, error } = useStory(storyId);

  const {
    getStoryProgress,
    saveStoryProgress,
    registerStoryChoice,
  } = useStoryProgress();

  const {
    diamonds,
    keys,
    canSpendCurrency,
    spendDiamonds,
  } = useWallet();

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

  const canContinue = Boolean(
    currentScene && !currentScene.choices?.length && currentScene.nextSceneId,
  );

  const isEnd = Boolean(
    currentScene && !currentScene.choices?.length && !currentScene.nextSceneId,
  );

  const getSceneProgress = useCallback(
    (sceneId: string) => {
      if (!chapter?.scenes.length) return 0;

      const sceneIndex = chapter.scenes.findIndex(
        scene => scene.id === sceneId,
      );

      if (sceneIndex < 0) return currentProgress;

      return Math.min(1, (sceneIndex + 1) / chapter.scenes.length);
    },
    [chapter, currentProgress],
  );

  const persistProgress = useCallback(
    async (nextSceneId: string) => {
      await saveStoryProgress({
        storyId,
        chapterId,
        sceneId: nextSceneId,
        progress: getSceneProgress(nextSceneId),
      });
    },
    [chapterId, getSceneProgress, saveStoryProgress, storyId],
  );

  const goToScene = useCallback(
    async (nextSceneId: string) => {
      await persistProgress(nextSceneId);
      setCurrentSceneId(nextSceneId);
    },
    [persistProgress],
  );

  const handleChoicePress = useCallback(
    async (choice: StoryChoice) => {
      if (!currentScene) return;

      if (choice.isPremium) {
        const cost = choice.cost ?? 0;

        if (!canSpendCurrency('diamonds', cost)) {
          setFeedbackMessage(
            'Você não tem diamantes suficientes para essa escolha.',
          );
          return;
        }

        await spendDiamonds(cost, 'premium_choice', choice.id);
      }

      await registerStoryChoice({
        storyId,
        chapterId,
        sceneId: currentScene.id,
        choiceId: choice.id,
        relationshipTarget: choice.effect?.target,
        relationshipValue: choice.effect?.value,
      });

      setFeedbackMessage(choice.effect?.message ?? null);

      await goToScene(choice.nextSceneId);
    },
    [
      canSpendCurrency,
      chapterId,
      currentScene,
      goToScene,
      registerStoryChoice,
      spendDiamonds,
      storyId,
    ],
  );

  const handleContinue = useCallback(async () => {
    if (!currentScene?.nextSceneId) return;

    setFeedbackMessage(null);
    await goToScene(currentScene.nextSceneId);
  }, [currentScene, goToScene]);

  const finishChapter = useCallback(async () => {
    if (!currentScene) return;

    await saveStoryProgress({
      storyId,
      chapterId,
      sceneId: currentScene.id,
      progress: 1,
    });
  }, [chapterId, currentScene, saveStoryProgress, storyId]);

  return {
    story,
    chapter,
    currentScene,

    loading,
    error,

    diamonds,
    keys,

    currentProgress,
    feedbackMessage,

    canContinue,
    isEnd,

    handleChoicePress,
    handleContinue,
    finishChapter,
  };
}
