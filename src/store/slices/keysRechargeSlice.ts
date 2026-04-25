import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type KeysRechargeState = {
  rechargeStartedAt: string | null;
};

const initialState: KeysRechargeState = {
  rechargeStartedAt: null,
};

const keysRechargeSlice = createSlice({
  name: 'keysRecharge',
  initialState,
  reducers: {
    setKeysRechargeStartedAt(state, action: PayloadAction<string | null>) {
      state.rechargeStartedAt = action.payload;
    },
  },
});

export const { setKeysRechargeStartedAt } = keysRechargeSlice.actions;

export const keysRechargeReducer = keysRechargeSlice.reducer;
