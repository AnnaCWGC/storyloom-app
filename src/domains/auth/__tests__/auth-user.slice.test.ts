import {
  addDiamonds,
  addKeys,
  authReducer,
  clearUser,
  login,
  logout,
  setUser,
  setVipStatus,
  spendDiamonds,
  spendKeys,
  userReducer,
} from '@/domains/auth';
import { createMockUser } from '@/test/mockUser';

describe('auth/user slices', () => {
  it('auth login stores tokens and marks user as authenticated', () => {
    const state = authReducer(
      undefined,
      login({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      }),
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.accessToken).toBe('access-token');
    expect(state.refreshToken).toBe('refresh-token');
  });

  it('auth logout clears tokens', () => {
    const loggedState = authReducer(
      undefined,
      login({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      }),
    );

    const state = authReducer(loggedState, logout());

    expect(state.isAuthenticated).toBe(false);
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it('sets and clears user', () => {
    const user = createMockUser();

    const state = userReducer(undefined, setUser(user));

    expect(state?.id).toBe(user.id);

    const cleared = userReducer(state, clearUser());

    expect(cleared).toBeNull();
  });

  it('adds and spends diamonds', () => {
    const initial = userReducer(
      undefined,
      setUser(createMockUser({ diamonds: 100 })),
    );

    const withAdded = userReducer(initial, addDiamonds(50));
    expect(withAdded?.diamonds).toBe(150);

    const withSpent = userReducer(withAdded, spendDiamonds(25));
    expect(withSpent?.diamonds).toBe(125);
  });

  it('does not spend diamonds when balance is insufficient', () => {
    const initial = userReducer(
      undefined,
      setUser(createMockUser({ diamonds: 10 })),
    );

    const state = userReducer(initial, spendDiamonds(25));

    expect(state?.diamonds).toBe(10);
  });

  it('adds keys but never exceeds max stock of 3', () => {
    const initial = userReducer(undefined, setUser(createMockUser({ keys: 2 })));

    const state = userReducer(initial, addKeys(10));

    expect(state?.keys).toBe(3);
  });

  it('spends keys when available', () => {
    const initial = userReducer(undefined, setUser(createMockUser({ keys: 3 })));

    const state = userReducer(initial, spendKeys(1));

    expect(state?.keys).toBe(2);
  });

  it('does not spend keys when balance is insufficient', () => {
    const initial = userReducer(undefined, setUser(createMockUser({ keys: 0 })));

    const state = userReducer(initial, spendKeys(1));

    expect(state?.keys).toBe(0);
  });

  it('sets VIP status', () => {
    const initial = userReducer(
      undefined,
      setUser(createMockUser({ isVip: false })),
    );

    const state = userReducer(initial, setVipStatus(true));

    expect(state?.isVip).toBe(true);
  });
});
