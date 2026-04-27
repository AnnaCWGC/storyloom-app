import { env } from '@/config/env';
import { WalletBalanceDTO } from '@/domains/wallet';
import { apiClient } from '@/services/apiClient';

export type VipPlan = 'monthly' | 'yearly';

export type VipStatusDTO = {
  isVip: boolean;
  plan?: VipPlan;
  startedAt?: string;
  expiresAt?: string;
  willRenew?: boolean;
};

export type StartVipTrialResponse = {
  isVip: true;
  plan: VipPlan;
  startedAt: string;
  expiresAt: string;
  willRenew: boolean;
  wallet?: WalletBalanceDTO;
};

export type CancelVipResponse = {
  isVip: boolean;
  willRenew: false;
  expiresAt?: string;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const vipService = {
  async getStatus(): Promise<VipStatusDTO> {
    if (env.USE_MOCKS) {
      await delay(120);

      return {
        isVip: false,
      };
    }

    return apiClient<VipStatusDTO>('/vip/status');
  },

  async startTrial(): Promise<StartVipTrialResponse> {
    if (env.USE_MOCKS) {
      await delay(220);

      const startedAt = new Date();
      const expiresAt = new Date(startedAt);
      expiresAt.setDate(expiresAt.getDate() + 3);

      return {
        isVip: true,
        plan: 'monthly',
        startedAt: startedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        willRenew: true,
      };
    }

    return apiClient<StartVipTrialResponse>('/vip/start-trial', {
      method: 'POST',
    });
  },

  async cancel(): Promise<CancelVipResponse> {
    if (env.USE_MOCKS) {
      await delay(180);

      return {
        isVip: false,
        willRenew: false,
      };
    }

    return apiClient<CancelVipResponse>('/vip/cancel', {
      method: 'POST',
    });
  },
};
