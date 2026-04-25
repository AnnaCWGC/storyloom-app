import { useCallback, useEffect, useState } from 'react';

import { storiesService } from '../services/storiesService';
import { Story } from '../types/story';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStories() {
    try {
      setLoading(true);
      setError(null);

      const response = await storiesService.findAll();

      setStories(response);
    } catch {
      setError('Não foi possível carregar as histórias.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStories();
  }, []);

  const findStoryById = useCallback(
    (storyId: string) => stories.find(story => story.id === storyId) ?? null,
    [stories],
  );

  return {
    stories,
    loading,
    error,
    refetch: loadStories,
    findStoryById,
  };
}
