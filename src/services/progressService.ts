import { env } from '../config/env';
import { apiClient } from './apiClient';

export type StoryProgressDTO = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  progress: number;
};

export type ChoiceHistoryDTO = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  choiceId: string;
  relationshipTarget?: string;
  relationshipValue?: number;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const progressService = {
  async saveProgress(payload: StoryProgressDTO): Promise<StoryProgressDTO> {
    if (env.USE_MOCKS) {
      await delay(120);
      return payload;
    }

    return apiClient<StoryProgressDTO>('/progress', {
      method: 'POST',
      body: payload,
    });
  },

  async registerChoice(payload: ChoiceHistoryDTO): Promise<ChoiceHistoryDTO> {
    if (env.USE_MOCKS) {
      await delay(120);
      return payload;
    }

    return apiClient<ChoiceHistoryDTO>('/progress/choices', {
      method: 'POST',
      body: payload,
    });
  },

  async resetProgress(storyId: string): Promise<void> {
    if (env.USE_MOCKS) {
      await delay(120);
      return;
    }

    await apiClient<void>(`/progress/${storyId}`, {
      method: 'DELETE',
    });
  },
};
