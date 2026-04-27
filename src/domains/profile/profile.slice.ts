import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState } from './profile.types';

const initialState: ProfileState = {
  preferences: {
    notificationsEnabled: true,
    matureContentEnabled: false,
    reduceMotionEnabled: false,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNotificationPreference(state, action: PayloadAction<boolean>) {
      state.preferences.notificationsEnabled = action.payload;
    },

    setMatureContentPreference(state, action: PayloadAction<boolean>) {
      state.preferences.matureContentEnabled = action.payload;
    },

    setReduceMotionPreference(state, action: PayloadAction<boolean>) {
      state.preferences.reduceMotionEnabled = action.payload;
    },

    resetProfilePreferences() {
      return initialState;
    },
  },
});

export const {
  setNotificationPreference,
  setMatureContentPreference,
  setReduceMotionPreference,
  resetProfilePreferences,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
