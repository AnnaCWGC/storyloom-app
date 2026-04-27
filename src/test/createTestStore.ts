import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer, userReducer } from '@/domains/auth';
import { libraryReducer } from '@/domains/library';
import { storyProgressReducer } from '@/domains/progress';
import { profileReducer } from '@/domains/profile';
import { rewardsReducer } from '@/domains/rewards';
import { keysRechargeReducer } from '@/domains/wallet';
import { vipReducer } from '@/domains/vip';

export const testRootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storyProgress: storyProgressReducer,
  library: libraryReducer,
  profile: profileReducer,
  rewards: rewardsReducer,
  keysRecharge: keysRechargeReducer,
  vip: vipReducer,
});

export type TestRootState = ReturnType<typeof testRootReducer>;

export function createTestStore(preloadedState?: Partial<TestRootState>) {
  return configureStore({
    reducer: testRootReducer,
    preloadedState: preloadedState as TestRootState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type TestStore = ReturnType<typeof createTestStore>;
export type TestDispatch = TestStore['dispatch'];
