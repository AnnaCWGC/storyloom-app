import { env } from '../config/env';
import { apiClient } from './apiClient';

export type RewardClaimResponse = {
  amount: number;
  message: string;
};

export type DiamondPackDTO = {
  id: string;
  title: string;
  amount: number;
  priceLabel: string;
  badge?: string;
};

export type RewardActionDTO = {
  id: string;
  title: string;
  description: string;
  amount: number;
};

export const diamondPacks: DiamondPackDTO[] = [
  {
    id: 'starter-pack',
    title: 'Starter Pack',
    amount: 50,
    priceLabel: 'Mock buy',
  },
  {
    id: 'popular-pack',
    title: 'Popular Pack',
    amount: 120,
    priceLabel: 'Mock buy',
    badge: 'POPULAR',
  },
  {
    id: 'royal-pack',
    title: 'Royal Pack',
    amount: 300,
    priceLabel: 'Mock buy',
    badge: 'BEST',
  },
  {
    id: 'legend-pack',
    title: 'Legend Pack',
    amount: 600,
    priceLabel: 'Mock buy',
  },
];

export const rewardActions: RewardActionDTO[] = [
  {
    id: 'bonus-scene',
    title: 'Watch a bonus scene',
    description: 'Prototype action. Adds diamonds instantly.',
    amount: 15,
  },
  {
    id: 'finish-chapter',
    title: 'Finish a chapter',
    description: 'Reward the player for completing a story chapter.',
    amount: 10,
  },
  {
    id: 'invite-friend',
    title: 'Invite a friend',
    description: 'Placeholder for future referral reward.',
    amount: 30,
  },
];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const rewardsService = {
  async getDiamondPacks(): Promise<DiamondPackDTO[]> {
    if (env.USE_MOCKS) {
      await delay(120);
      return diamondPacks;
    }

    return apiClient<DiamondPackDTO[]>('/rewards/diamond-packs');
  },

  async getRewardActions(): Promise<RewardActionDTO[]> {
    if (env.USE_MOCKS) {
      await delay(120);
      return rewardActions;
    }

    return apiClient<RewardActionDTO[]>('/rewards/actions');
  },

  async claimDailyReward(params: {
    isVip: boolean;
  }): Promise<RewardClaimResponse> {
    if (env.USE_MOCKS) {
      await delay(180);

      const amount = params.isVip ? 30 : 12;

      return {
        amount,
        message: `Daily reward collected: +${amount} diamonds`,
      };
    }

    return apiClient<RewardClaimResponse>('/rewards/daily', {
      method: 'POST',
      body: params,
    });
  },

  async claimActionReward(actionId: string): Promise<RewardClaimResponse> {
    if (env.USE_MOCKS) {
      await delay(180);

      const action = rewardActions.find(item => item.id === actionId);

      if (!action) {
        throw new Error('Reward action not found.');
      }

      return {
        amount: action.amount,
        message: `${action.title}: +${action.amount} diamonds`,
      };
    }

    return apiClient<RewardClaimResponse>(`/rewards/actions/${actionId}/claim`, {
      method: 'POST',
    });
  },

  async claimDiamondPack(packId: string): Promise<RewardClaimResponse> {
    if (env.USE_MOCKS) {
      await delay(180);

      const pack = diamondPacks.find(item => item.id === packId);

      if (!pack) {
        throw new Error('Diamond pack not found.');
      }

      return {
        amount: pack.amount,
        message: `${pack.title}: +${pack.amount} diamonds`,
      };
    }

    return apiClient<RewardClaimResponse>(
      `/rewards/diamond-packs/${packId}/claim`,
      {
        method: 'POST',
      },
    );
  },
};
