import { act, waitFor } from '@testing-library/react-native';

import { useStoryReader } from '@/domains/reader';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useStoryReader', () => {
  it('loads initial story scene', async () => {
    const { result } = renderHookWithProviders(() =>
      useStoryReader({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.story?.id).toBe('the-royal-lie');
    expect(result.current.chapter?.id).toBe('chapter-1');
    expect(result.current.currentScene?.id).toBe('scene-1');
  });

  it('normal choice registers choice and advances scene', async () => {
    const { result, store } = renderHookWithProviders(
      () =>
        useStoryReader({
          storyId: 'the-royal-lie',
          chapterId: 'chapter-1',
        }),
      {
        preloadedState: {
          user: createMockUser({ diamonds: 100 }),
        },
      },
    );

    await waitFor(() => {
      expect(result.current.currentScene?.id).toBe('scene-1');
    });

    const choice = result.current.currentScene?.choices?.find(
      item => !item.isPremium,
    );

    expect(choice).toBeDefined();

    await act(async () => {
      await result.current.handleChoicePress(choice!);
    });

    expect(store.getState().storyProgress.choicesHistory).toHaveLength(1);
    expect(
      store.getState().storyProgress.progressByStory['the-royal-lie'].sceneId,
    ).toBe(choice!.nextSceneId);
  });

  it('premium choice spends diamonds and advances scene', async () => {
    const { result, store } = renderHookWithProviders(
      () =>
        useStoryReader({
          storyId: 'the-royal-lie',
          chapterId: 'chapter-1',
        }),
      {
        preloadedState: {
          user: createMockUser({ diamonds: 100 }),
        },
      },
    );

    await waitFor(() => {
      expect(result.current.currentScene?.id).toBe('scene-1');
    });

    const premiumChoice = result.current.currentScene?.choices?.find(
      item => item.isPremium,
    );

    expect(premiumChoice).toBeDefined();

    await act(async () => {
      await result.current.handleChoicePress(premiumChoice!);
    });

    expect(store.getState().user?.diamonds).toBe(75);
    expect(
      store.getState().storyProgress.progressByStory['the-royal-lie'].sceneId,
    ).toBe(premiumChoice!.nextSceneId);
  });

  it('premium choice with insufficient diamonds does not advance', async () => {
    const { result, store } = renderHookWithProviders(
      () =>
        useStoryReader({
          storyId: 'the-royal-lie',
          chapterId: 'chapter-1',
        }),
      {
        preloadedState: {
          user: createMockUser({ diamonds: 0 }),
        },
      },
    );

    await waitFor(() => {
      expect(result.current.currentScene?.id).toBe('scene-1');
    });

    const premiumChoice = result.current.currentScene?.choices?.find(
      item => item.isPremium,
    );

    expect(premiumChoice).toBeDefined();

    await act(async () => {
      await result.current.handleChoicePress(premiumChoice!);
    });

    expect(store.getState().user?.diamonds).toBe(0);
    expect(result.current.feedbackMessage).toContain('diamantes');
    expect(
      store.getState().storyProgress.progressByStory['the-royal-lie'],
    ).toBeUndefined();
  });

  it('finishChapter saves progress as 100%', async () => {
    const { result, store } = renderHookWithProviders(() =>
      useStoryReader({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
      }),
    );

    await waitFor(() => {
      expect(result.current.currentScene?.id).toBe('scene-1');
    });

    await act(async () => {
      await result.current.finishChapter();
    });

    expect(
      store.getState().storyProgress.progressByStory['the-royal-lie'].progress,
    ).toBe(1);
  });
});
