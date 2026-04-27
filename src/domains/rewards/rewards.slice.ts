import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RewardsHistoryItem = {
  id: string;
  message: string;
  amount: number;
  createdAt: string;
};

type RewardsState = {
  dailyClaimed: boolean;
  lastRewardMessage: string | null;
  history: RewardsHistoryItem[];
};

const initialState: RewardsState = {
  dailyClaimed: false,
  lastRewardMessage: null,
  history: [],
};

type RegisterRewardPayload = {
  message: string;
  amount: number;
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    setDailyClaimed(state, action: PayloadAction<boolean>) {
      state.dailyClaimed = action.payload;
    },

    registerReward(state, action: PayloadAction<RegisterRewardPayload>) {
      const item: RewardsHistoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        message: action.payload.message,
        amount: action.payload.amount,
        createdAt: new Date().toISOString(),
      };

      state.lastRewardMessage = action.payload.message;
      state.history.unshift(item);

      state.history = state.history.slice(0, 10);
    },

    clearRewardMessage(state) {
      state.lastRewardMessage = null;
    },

    resetRewardsState() {
      return initialState;
    },
  },
});

export const {
  setDailyClaimed,
  registerReward,
  clearRewardMessage,
  resetRewardsState,
} = rewardsSlice.actions;

export const rewardsReducer = rewardsSlice.reducer;
