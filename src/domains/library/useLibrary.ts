import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { libraryService } from './library.service';
import {
  addFavoriteStory,
  removeFavoriteStory,
  setFavoriteStoryIds,
} from './library.slice';

export function useLibrary() {
  const dispatch = useAppDispatch();
  const favoriteStoryIds = useAppSelector(
    state => state.library.favoriteStoryIds,
  );
  const [loading, setLoading] = useState(false);

  const isFavoriteStory = useCallback(
    (storyId: string) => {
      return favoriteStoryIds.includes(storyId);
    },
    [favoriteStoryIds],
  );

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);

      const response = await libraryService.getFavorites();

      dispatch(setFavoriteStoryIds(response));

      return response;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const favoriteStory = useCallback(
    async (storyId: string) => {
      try {
        setLoading(true);

        const response = await libraryService.favoriteStory(storyId);

        if (response.isFavorite) {
          dispatch(addFavoriteStory(storyId));
        }

        return response;
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const unfavoriteStory = useCallback(
    async (storyId: string) => {
      try {
        setLoading(true);

        const response = await libraryService.unfavoriteStory(storyId);

        if (!response.isFavorite) {
          dispatch(removeFavoriteStory(storyId));
        }

        return response;
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const toggleFavorite = useCallback(
    async (storyId: string) => {
      if (isFavoriteStory(storyId)) {
        return unfavoriteStory(storyId);
      }

      return favoriteStory(storyId);
    },
    [favoriteStory, isFavoriteStory, unfavoriteStory],
  );

  return {
    favoriteStoryIds,
    loading,
    isFavoriteStory,
    loadFavorites,
    favoriteStory,
    unfavoriteStory,
    toggleFavorite,
  };
}
