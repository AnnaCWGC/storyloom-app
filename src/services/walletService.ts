import { env } from '../config/env';
import { apiClient } from './apiClient';

export type WalletCurrency = 'diamonds' | 'keys';

export type WalletBalanceDTO = {
  diamonds: number;
  keys: number;
};

export type WalletTransactionDTO = {
  currency: WalletCurrency;
  amount: number;
  reason:
    | 'reward'
    | 'premium_choice'
    | 'chapter_entry'
    | 'purchase'
    | 'admin_adjustment'
    | 'chapter_completion'
    | 'daily_bonus'
    | 'key_recharge';
  referenceId?: string;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const walletService = {
  async getBalance(): Promise<WalletBalanceDTO> {
    if (env.USE_MOCKS) {
      await delay(120);

      return {
        diamonds: 0,
        keys: 0,
      };
    }

    return apiClient<WalletBalanceDTO>('/wallet/balance');
  },

  async addCurrency(
    payload: WalletTransactionDTO,
  ): Promise<WalletTransactionDTO> {
    if (env.USE_MOCKS) {
      await delay(120);
      return payload;
    }

    return apiClient<WalletTransactionDTO>('/wallet/currency/add', {
      method: 'POST',
      body: payload,
    });
  },

  async spendCurrency(
    payload: WalletTransactionDTO,
  ): Promise<WalletTransactionDTO> {
    if (env.USE_MOCKS) {
      await delay(120);
      return payload;
    }

    return apiClient<WalletTransactionDTO>('/wallet/currency/spend', {
      method: 'POST',
      body: payload,
    });
  },
};
