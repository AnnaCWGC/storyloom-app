import { env } from '@/config/env';
import { apiClient } from '@/services/apiClient';

import {
  ChoiceHistoryDTO,
  StoryProgressDTO,
} from './progress.types';

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
