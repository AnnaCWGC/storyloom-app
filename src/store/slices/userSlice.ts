import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id: string;
  name: string;
  diamonds: number;
  avatar?: string;
};

const initialState: UserState = {
  id: 'user-1',
  name: 'Anna',
  diamonds: 220,
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    addDiamonds(state, action: PayloadAction<number>) {
      state.diamonds += action.payload;
    },
    spendDiamonds(state, action: PayloadAction<number>) {
      if (state.diamonds < action.payload) {
        return;
      }

      state.diamonds -= action.payload;
    },
  },
});

export const { setUser, addDiamonds, spendDiamonds } = userSlice.actions;

export const userReducer = userSlice.reducer;
