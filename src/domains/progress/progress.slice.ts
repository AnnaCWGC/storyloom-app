import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ChoiceHistoryItem,
  RelationshipPoints,
  StoryProgress,
} from './progress.types';

type StoryProgressState = {
  progressByStory: Record<string, StoryProgress>;
  choicesHistory: ChoiceHistoryItem[];
  relationshipPoints: RelationshipPoints;
};

const initialState: StoryProgressState = {
  progressByStory: {},
  choicesHistory: [],
  relationshipPoints: {},
};

type SaveProgressPayload = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  progress: number;
};

type RegisterChoicePayload = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  choiceId: string;
  relationshipTarget?: string;
  relationshipValue?: number;
};

const progressSlice = createSlice({
  name: 'storyProgress',
  initialState,
  reducers: {
    saveProgress(state, action: PayloadAction<SaveProgressPayload>) {
      const { storyId, chapterId, sceneId, progress } = action.payload;

      state.progressByStory[storyId] = {
        storyId,
        chapterId,
        sceneId,
        progress,
      };
    },
    registerChoice(state, action: PayloadAction<RegisterChoicePayload>) {
      const {
        storyId,
        chapterId,
        sceneId,
        choiceId,
        relationshipTarget,
        relationshipValue,
      } = action.payload;

      state.choicesHistory.push({
        storyId,
        chapterId,
        sceneId,
        choiceId,
      });

      if (relationshipTarget && relationshipValue) {
        state.relationshipPoints[relationshipTarget] =
          (state.relationshipPoints[relationshipTarget] ?? 0) +
          relationshipValue;
      }
    },
    resetStoryProgress(state, action: PayloadAction<string>) {
      const storyId = action.payload;

      delete state.progressByStory[storyId];

      state.choicesHistory = state.choicesHistory.filter(
        item => item.storyId !== storyId,
      );
    },
    resetAllStoryProgress() {
      return initialState;
    },
  },
});

export const {
  saveProgress,
  registerChoice,
  resetStoryProgress,
  resetAllStoryProgress,
} = progressSlice.actions;

export const storyProgressReducer = progressSlice.reducer;
