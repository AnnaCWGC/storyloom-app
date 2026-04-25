import { useEffect, useState } from 'react';

import { storiesService } from '../services/storiesService';
import { Story } from '../types/story';

type UseFilteredStoriesParams = {
  search?: string;
  genre?: string;
  status?: 'all' | 'new' | 'ongoing' | 'completed';
};

export function useFilteredStories(params: UseFilteredStoriesParams) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStories() {
    try {
      setLoading(true);
      setError(null);

      const response = await storiesService.search(params);

      setStories(response);
    } catch {
      setError('Não foi possível buscar histórias.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStories();
  }, [params.search, params.genre, params.status]);

  return {
    stories,
    loading,
    error,
    refetch: loadStories,
  };
}
