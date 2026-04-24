import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { storyProgressReducer } from './slices/storyProgressSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    storyProgress: storyProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
