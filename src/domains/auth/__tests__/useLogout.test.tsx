import { act } from '@testing-library/react-native';

import { useLogout } from '@/domains/auth';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useLogout', () => {
  it('clears user-specific state on logout', async () => {
    const { result, store } = renderHookWithProviders(() => useLogout(), {
      preloadedState: {
        auth: {
          isAuthenticated: true,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
        user: createMockUser({
          isVip: true,
          diamonds: 500,
          keys: 1,
        }),
        library: {
          favoriteStoryIds: ['the-royal-lie'],
        },
        storyProgress: {
          progressByStory: {
            'the-royal-lie': {
              storyId: 'the-royal-lie',
              chapterId: 'chapter-1',
              sceneId: 'scene-2',
              progress: 0.5,
            },
          },
          choicesHistory: [],
          relationshipPoints: {},
        },
        rewards: {
          dailyClaimed: true,
          lastRewardMessage: 'Daily reward collected',
          history: [
            {
              id: 'reward-1',
              message: 'Daily reward collected',
              amount: 12,
              createdAt: new Date().toISOString(),
            },
          ],
        },
        vip: {
          plan: 'monthly',
          startedAt: new Date().toISOString(),
          expiresAt: new Date().toISOString(),
          willRenew: true,
        },
        keysRecharge: {
          rechargeStartedAt: new Date().toISOString(),
        },
      },
    });

    await act(async () => {
      await result.current.logout();
    });

    const state = store.getState();

    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.accessToken).toBeNull();
    expect(state.user).toBeNull();
    expect(state.library.favoriteStoryIds).toEqual([]);
    expect(state.storyProgress.progressByStory).toEqual({});
    expect(state.rewards.dailyClaimed).toBe(false);
    expect(state.vip.plan).toBeNull();
    expect(state.keysRecharge.rechargeStartedAt).toBeNull();
  });
});
