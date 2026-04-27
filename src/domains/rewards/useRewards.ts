import { useCallback, useEffect, useState } from 'react';

import { useVip } from '@/domains/vip';
import { useWallet, WalletTransactionReason } from '@/domains/wallet';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { rewardsService } from './rewards.service';
import {
  registerReward,
  setDailyClaimed,
} from './rewards.slice';
import { DiamondPackDTO, RewardActionDTO } from './rewards.types';

export function useRewards() {
  const dispatch = useAppDispatch();
  const {
    diamonds,
    keys,
    maxKeys,
    nextKeyAt,
    addDiamonds,
  } = useWallet();
  const {
    isVip,
    loading: vipLoading,
    toggleVipMock,
    startVipTrial,
    cancelVip,
    plan,
    expiresAt,
    willRenew,
  } = useVip();

  const dailyClaimed = useAppSelector(state => state.rewards.dailyClaimed);
  const lastRewardMessage = useAppSelector(
    state => state.rewards.lastRewardMessage,
  );
  const history = useAppSelector(state => state.rewards.history);

  const [diamondPacks, setDiamondPacks] = useState<DiamondPackDTO[]>([]);
  const [rewardActions, setRewardActions] = useState<RewardActionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRewards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [packs, actions] = await Promise.all([
        rewardsService.getDiamondPacks(),
        rewardsService.getRewardActions(),
      ]);

      setDiamondPacks(packs);
      setRewardActions(actions);
    } catch {
      setError('Não foi possível carregar recompensas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const applyReward = useCallback(
    async (
      amount: number,
      message: string,
      reason: WalletTransactionReason = 'reward',
    ) => {
      await addDiamonds(amount, reason);

      dispatch(registerReward({ amount, message }));
    },
    [addDiamonds, dispatch],
  );

  const claimDailyReward = useCallback(async () => {
    if (dailyClaimed || claiming) return;

    try {
      setClaiming(true);

      const response = await rewardsService.claimDailyReward({ isVip });

      await applyReward(response.amount, response.message, 'daily_bonus');
      dispatch(setDailyClaimed(true));
    } finally {
      setClaiming(false);
    }
  }, [applyReward, claiming, dailyClaimed, dispatch, isVip]);

  const claimActionReward = useCallback(
    async (actionId: string) => {
      if (claiming) return;

      try {
        setClaiming(true);

        const response = await rewardsService.claimActionReward(actionId);

        await applyReward(response.amount, response.message, 'reward');
      } finally {
        setClaiming(false);
      }
    },
    [applyReward, claiming],
  );

  const claimDiamondPack = useCallback(
    async (packId: string) => {
      if (claiming) return;

      try {
        setClaiming(true);

        const response = await rewardsService.claimDiamondPack(packId);

        await applyReward(response.amount, response.message, 'purchase');
      } finally {
        setClaiming(false);
      }
    },
    [applyReward, claiming],
  );

  return {
    diamonds,
    keys,
    isVip,
    maxKeys,
    nextKeyAt,
    plan,
    expiresAt,
    willRenew,
    vipLoading,
    dailyRewardAmount: isVip ? 30 : 12,
    dailyClaimed,
    lastRewardMessage,
    history,
    diamondPacks,
    rewardActions,
    loading,
    claiming,
    error,
    refetch: loadRewards,
    claimDailyReward,
    claimActionReward,
    claimDiamondPack,
    toggleVipMock,
    startVipTrial,
    cancelVip,
  };
}
