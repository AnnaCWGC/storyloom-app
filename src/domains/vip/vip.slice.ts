import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VipPlan } from './vip.service';

type VipState = {
  plan: VipPlan | null;
  startedAt: string | null;
  expiresAt: string | null;
  willRenew: boolean;
};

const initialState: VipState = {
  plan: null,
  startedAt: null,
  expiresAt: null,
  willRenew: false,
};

type SetVipMetadataPayload = {
  plan?: VipPlan;
  startedAt?: string;
  expiresAt?: string;
  willRenew?: boolean;
};

const vipSlice = createSlice({
  name: 'vip',
  initialState,
  reducers: {
    setVipMetadata(state, action: PayloadAction<SetVipMetadataPayload>) {
      state.plan = action.payload.plan ?? state.plan;
      state.startedAt = action.payload.startedAt ?? state.startedAt;
      state.expiresAt = action.payload.expiresAt ?? state.expiresAt;
      state.willRenew = action.payload.willRenew ?? state.willRenew;
    },

    clearVipMetadata() {
      return initialState;
    },
  },
});

export const { setVipMetadata, clearVipMetadata } = vipSlice.actions;

export const vipReducer = vipSlice.reducer;
