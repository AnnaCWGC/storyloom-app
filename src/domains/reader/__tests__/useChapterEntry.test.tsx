import { act } from '@testing-library/react-native';

import { useChapterEntry } from '@/domains/reader';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useChapterEntry', () => {
  it('regular user spends one key to start chapter', async () => {
    const { result, store } = renderHookWithProviders(() => useChapterEntry(), {
      preloadedState: {
        user: createMockUser({ keys: 3, isVip: false }),
      },
    });

    let response: Awaited<ReturnType<typeof result.current.startChapter>>;

    await act(async () => {
      response = await result.current.startChapter({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
      });
    });

    expect(response!.allowed).toBe(true);
    expect(response!.usedKey).toBe(true);
    expect(store.getState().user?.keys).toBe(2);
  });

  it('regular user with no keys cannot start chapter', async () => {
    const { result, store } = renderHookWithProviders(() => useChapterEntry(), {
      preloadedState: {
        user: createMockUser({ keys: 0, isVip: false }),
      },
    });

    let response: Awaited<ReturnType<typeof result.current.startChapter>>;

    await act(async () => {
      response = await result.current.startChapter({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
      });
    });

    expect(response!.allowed).toBe(false);
    expect(response!.usedKey).toBe(false);
    expect(store.getState().user?.keys).toBe(0);
  });

  it('VIP user can start chapter without spending key', async () => {
    const { result, store } = renderHookWithProviders(() => useChapterEntry(), {
      preloadedState: {
        user: createMockUser({ keys: 0, isVip: true }),
      },
    });

    let response: Awaited<ReturnType<typeof result.current.startChapter>>;

    await act(async () => {
      response = await result.current.startChapter({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
      });
    });

    expect(response!.allowed).toBe(true);
    expect(response!.usedKey).toBe(false);
    expect(store.getState().user?.keys).toBe(0);
  });
});
