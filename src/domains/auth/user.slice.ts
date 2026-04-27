import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppUser } from './auth.types';

type UserState = AppUser | null;

const MAX_KEYS = 3;

const initialState = null as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<AppUser>) {
      return action.payload;
    },

    clearUser() {
      return null;
    },

    addDiamonds(state, action: PayloadAction<number>) {
      if (!state) return;

      state.diamonds += action.payload;
    },

    spendDiamonds(state, action: PayloadAction<number>) {
      if (!state) return;

      if (state.diamonds < action.payload) {
        return;
      }

      state.diamonds -= action.payload;
    },

    addKeys(state, action: PayloadAction<number>) {
      if (!state) return;

      state.keys = Math.min(MAX_KEYS, state.keys + action.payload);
    },

    spendKeys(state, action: PayloadAction<number>) {
      if (!state) return;

      if (state.keys < action.payload) {
        return;
      }

      state.keys -= action.payload;
    },

    setVipStatus(state, action: PayloadAction<boolean>) {
      if (!state) return;

      state.isVip = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  addDiamonds,
  spendDiamonds,
  addKeys,
  spendKeys,
  setVipStatus,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
