import { act } from '@testing-library/react-native';

import { useLibrary } from '@/domains/library';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useLibrary', () => {
  it('favorites and unfavorites a story', async () => {
    const { result, store } = renderHookWithProviders(() => useLibrary());

    await act(async () => {
      await result.current.favoriteStory('the-royal-lie');
    });

    expect(store.getState().library.favoriteStoryIds).toContain(
      'the-royal-lie',
    );

    await act(async () => {
      await result.current.unfavoriteStory('the-royal-lie');
    });

    expect(store.getState().library.favoriteStoryIds).not.toContain(
      'the-royal-lie',
    );
  });

  it('toggles favorite', async () => {
    const { result, store } = renderHookWithProviders(() => useLibrary());

    await act(async () => {
      await result.current.toggleFavorite('the-royal-lie');
    });

    expect(store.getState().library.favoriteStoryIds).toContain(
      'the-royal-lie',
    );

    await act(async () => {
      await result.current.toggleFavorite('the-royal-lie');
    });

    expect(store.getState().library.favoriteStoryIds).not.toContain(
      'the-royal-lie',
    );
  });
});
