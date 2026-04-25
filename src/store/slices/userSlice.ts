import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppUser } from '../../types/user';

export type UserState = AppUser | null;

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

      state.diamonds = (state.diamonds ?? 0) + action.payload;
    },

    spendDiamonds(state, action: PayloadAction<number>) {
      if (!state) return;

      if ((state.diamonds ?? 0) < action.payload) {
        return;
      }

      state.diamonds -= action.payload;
    },

    addKeys(state, action: PayloadAction<number>) {
      if (!state) return;

      state.keys = (state.keys ?? 0) + action.payload;
    },

    spendKeys(state, action: PayloadAction<number>) {
      if (!state) return;

      if ((state.keys ?? 0) < action.payload) {
        return;
      }

      state.keys -= action.payload;
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
} = userSlice.actions;

export const userReducer = userSlice.reducer;
