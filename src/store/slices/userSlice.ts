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

      state.diamonds += action.payload;
    },

    spendDiamonds(state, action: PayloadAction<number>) {
      if (!state) return;

      if (state.diamonds < action.payload) {
        return;
      }

      state.diamonds -= action.payload;
    },
  },
});

export const { setUser, clearUser, addDiamonds, spendDiamonds } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
