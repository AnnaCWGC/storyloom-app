import { env } from '../config/env';
import { apiClient } from './apiClient';

export type FavoriteStoryResponse = {
  storyId: string;
  isFavorite: boolean;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const libraryService = {
  async getFavorites(): Promise<string[]> {
    if (env.USE_MOCKS) {
      await delay(120);

      return [];
    }

    const response = await apiClient<{ favoriteStoryIds: string[] }>(
      '/library/favorites',
    );

    return response.favoriteStoryIds;
  },

  async favoriteStory(storyId: string): Promise<FavoriteStoryResponse> {
    if (env.USE_MOCKS) {
      await delay(120);

      return {
        storyId,
        isFavorite: true,
      };
    }

    return apiClient<FavoriteStoryResponse>(`/library/favorites/${storyId}`, {
      method: 'POST',
    });
  },

  async unfavoriteStory(storyId: string): Promise<FavoriteStoryResponse> {
    if (env.USE_MOCKS) {
      await delay(120);

      return {
        storyId,
        isFavorite: false,
      };
    }

    return apiClient<FavoriteStoryResponse>(`/library/favorites/${storyId}`, {
      method: 'DELETE',
    });
  },
};
