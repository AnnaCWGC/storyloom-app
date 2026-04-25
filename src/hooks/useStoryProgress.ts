import { useCallback } from 'react';

import { progressService } from '../services/progressService';
import type {
  ChoiceHistoryDTO,
  StoryProgressDTO,
} from '../services/progressService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  registerChoice,
  resetStoryProgress,
  saveProgress,
} from '../store/slices/storyProgressSlice';

export function useStoryProgress() {
  const dispatch = useAppDispatch();

  const progressByStory = useAppSelector(
    state => state.storyProgress.progressByStory,
  );

  const choicesHistory = useAppSelector(
    state => state.storyProgress.choicesHistory,
  );

  const relationshipPoints = useAppSelector(
    state => state.storyProgress.relationshipPoints,
  );

  const getStoryProgress = useCallback(
    (storyId: string) => {
      return progressByStory[storyId] ?? null;
    },
    [progressByStory],
  );

  const saveStoryProgress = useCallback(
    async (payload: StoryProgressDTO) => {
      const savedProgress = await progressService.saveProgress(payload);

      dispatch(saveProgress(savedProgress));

      return savedProgress;
    },
    [dispatch],
  );

  const registerStoryChoice = useCallback(
    async (payload: ChoiceHistoryDTO) => {
      const savedChoice = await progressService.registerChoice(payload);

      dispatch(
        registerChoice({
          storyId: savedChoice.storyId,
          chapterId: savedChoice.chapterId,
          sceneId: savedChoice.sceneId,
          choiceId: savedChoice.choiceId,
          relationshipTarget: savedChoice.relationshipTarget,
          relationshipValue: savedChoice.relationshipValue,
        }),
      );

      return savedChoice;
    },
    [dispatch],
  );

  const resetProgressForStory = useCallback(
    async (storyId: string) => {
      await progressService.resetProgress(storyId);

      dispatch(resetStoryProgress(storyId));
    },
    [dispatch],
  );

  return {
    progressByStory,
    choicesHistory,
    relationshipPoints,
    getStoryProgress,
    saveStoryProgress,
    registerStoryChoice,
    resetProgressForStory,
  };
}
