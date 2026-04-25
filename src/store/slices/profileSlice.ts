import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfilePreferences = {
  notificationsEnabled: boolean;
  matureContentEnabled: boolean;
  reduceMotionEnabled: boolean;
};

type ProfileState = {
  preferences: ProfilePreferences;
};

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
  },
});

export const {
  setNotificationPreference,
  setMatureContentPreference,
  setReduceMotionPreference,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
