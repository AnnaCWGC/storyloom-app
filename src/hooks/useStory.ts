import { useEffect, useState } from 'react';

import { storiesService } from '../services/storiesService';
import { Story } from '../types/story';

export function useStory(storyId?: string) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStory() {
    if (!storyId) {
      setStory(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await storiesService.findById(storyId);

      setStory(response);
    } catch {
      setError('Não foi possível carregar esta história.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStory();
  }, [storyId]);

  return {
    story,
    loading,
    error,
    refetch: loadStory,
  };
}
