import { act, waitFor } from '@testing-library/react-native';

import { useRewards } from '@/domains/rewards';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useRewards', () => {
  it('regular user claims daily reward and receives 12 diamonds', async () => {
    const { result, store } = renderHookWithProviders(() => useRewards(), {
      preloadedState: {
        user: createMockUser({ diamonds: 0, isVip: false }),
      },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.claimDailyReward();
    });

    expect(store.getState().user?.diamonds).toBe(12);
    expect(store.getState().rewards.dailyClaimed).toBe(true);
  });

  it('VIP user claims daily reward and receives 30 diamonds', async () => {
    const { result, store } = renderHookWithProviders(() => useRewards(), {
      preloadedState: {
        user: createMockUser({ diamonds: 0, isVip: true }),
      },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.claimDailyReward();
    });

    expect(store.getState().user?.diamonds).toBe(30);
    expect(store.getState().rewards.dailyClaimed).toBe(true);
  });

  it('does not claim daily reward twice', async () => {
    const { result, store } = renderHookWithProviders(() => useRewards(), {
      preloadedState: {
        user: createMockUser({ diamonds: 0, isVip: false }),
        rewards: {
          dailyClaimed: true,
          lastRewardMessage: null,
          history: [],
        },
      },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.claimDailyReward();
    });

    expect(store.getState().user?.diamonds).toBe(0);
  });

  it('diamond pack adds diamonds', async () => {
    const { result, store } = renderHookWithProviders(() => useRewards(), {
      preloadedState: {
        user: createMockUser({ diamonds: 0 }),
      },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.claimDiamondPack('starter-pack');
    });

    expect(store.getState().user?.diamonds).toBe(50);
  });
});
