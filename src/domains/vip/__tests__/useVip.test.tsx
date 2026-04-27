import { act } from '@testing-library/react-native';

import { useVip } from '@/domains/vip';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useVip', () => {
  it('starts VIP trial and updates user/VIP metadata', async () => {
    const { result, store } = renderHookWithProviders(() => useVip(), {
      preloadedState: {
        user: createMockUser({ isVip: false }),
      },
    });

    await act(async () => {
      await result.current.startVipTrial();
    });

    expect(store.getState().user?.isVip).toBe(true);
    expect(store.getState().vip.plan).toBe('monthly');
    expect(store.getState().vip.startedAt).not.toBeNull();
    expect(store.getState().vip.expiresAt).not.toBeNull();
    expect(store.getState().vip.willRenew).toBe(true);
  });

  it('cancels VIP and clears metadata', async () => {
    const { result, store } = renderHookWithProviders(() => useVip(), {
      preloadedState: {
        user: createMockUser({ isVip: true }),
        vip: {
          plan: 'monthly',
          startedAt: new Date().toISOString(),
          expiresAt: new Date().toISOString(),
          willRenew: true,
        },
      },
    });

    await act(async () => {
      await result.current.cancelVip();
    });

    expect(store.getState().user?.isVip).toBe(false);
    expect(store.getState().vip.plan).toBeNull();
    expect(store.getState().vip.startedAt).toBeNull();
    expect(store.getState().vip.expiresAt).toBeNull();
    expect(store.getState().vip.willRenew).toBe(false);
  });
});
