import { env } from '@/config/env';
import { apiClient } from '@/services/apiClient';

import { WalletBalanceDTO, WalletTransactionDTO } from './wallet.types';

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
