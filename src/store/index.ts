import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { authReducer } from './slices/authSlice';
import { libraryReducer } from './slices/librarySlice';
import { keysRechargeReducer } from './slices/keysRechargeSlice';
import { profileReducer } from './slices/profileSlice';
import { rewardsReducer } from './slices/rewardsSlice';
import { storyProgressReducer } from './slices/storyProgressSlice';
import { userReducer } from './slices/userSlice';
import { vipReducer } from './slices/vipSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storyProgress: storyProgressReducer,
  library: libraryReducer,
  profile: profileReducer,
  rewards: rewardsReducer,
  keysRecharge: keysRechargeReducer,
  vip: vipReducer,
});

const persistConfig = {
  key: 'root-v3',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'user',
    'storyProgress',
    'library',
    'profile',
    'rewards',
    'keysRecharge',
    'vip',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
