import { act, waitFor } from '@testing-library/react-native';

import { useWallet } from '@/domains/wallet';
import { createMockUser } from '@/test/mockUser';
import { renderHookWithProviders } from '@/test/renderHookWithProviders';

describe('useWallet', () => {
  it('spends keys for regular user and starts recharge', async () => {
    const { result, store } = renderHookWithProviders(() => useWallet(), {
      preloadedState: {
        user: createMockUser({ keys: 3, isVip: false }),
      },
    });

    await act(async () => {
      await result.current.spendKeys(1, 'chapter_entry', 'chapter-1');
    });

    expect(store.getState().user?.keys).toBe(2);

    await waitFor(() => {
      expect(store.getState().keysRecharge.rechargeStartedAt).not.toBeNull();
    });
  });

  it('does not spend keys for VIP user', async () => {
    const { result, store } = renderHookWithProviders(() => useWallet(), {
      preloadedState: {
        user: createMockUser({ keys: 0, isVip: true }),
      },
    });

    await act(async () => {
      await result.current.spendKeys(1, 'chapter_entry', 'chapter-1');
    });

    expect(store.getState().user?.keys).toBe(0);
  });

  it('throws when regular user tries to spend unavailable keys', async () => {
    const { result } = renderHookWithProviders(() => useWallet(), {
      preloadedState: {
        user: createMockUser({ keys: 0, isVip: false }),
      },
    });

    await expect(
      result.current.spendKeys(1, 'chapter_entry', 'chapter-1'),
    ).rejects.toThrow('INSUFFICIENT_KEYS');
  });

  it('spends diamonds for premium choices', async () => {
    const { result, store } = renderHookWithProviders(() => useWallet(), {
      preloadedState: {
        user: createMockUser({ diamonds: 100 }),
      },
    });

    await act(async () => {
      await result.current.spendDiamonds(25, 'premium_choice', 'choice-1');
    });

    expect(store.getState().user?.diamonds).toBe(75);
  });

  it('throws when diamonds are insufficient', async () => {
    const { result } = renderHookWithProviders(() => useWallet(), {
      preloadedState: {
        user: createMockUser({ diamonds: 5 }),
      },
    });

    await expect(
      result.current.spendDiamonds(25, 'premium_choice', 'choice-1'),
    ).rejects.toThrow('INSUFFICIENT_DIAMONDS');
  });
});
