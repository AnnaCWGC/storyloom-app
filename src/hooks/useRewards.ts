import { useCallback, useEffect, useState } from 'react';

import {
  DiamondPackDTO,
  RewardActionDTO,
  rewardsService,
} from '../services/rewardsService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  registerReward,
  setDailyClaimed,
} from '../store/slices/rewardsSlice';
import { useWallet } from './useWallet';

export function useRewards() {
  const dispatch = useAppDispatch();
  const { diamonds, keys, addDiamonds } = useWallet();

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
    async (amount: number, message: string) => {
      await addDiamonds(amount, 'reward');

      dispatch(registerReward({ amount, message }));
    },
    [addDiamonds, dispatch],
  );

  const claimDailyReward = useCallback(async () => {
    if (dailyClaimed || claiming) return;

    try {
      setClaiming(true);

      const response = await rewardsService.claimDailyReward();

      await applyReward(response.amount, response.message);
      dispatch(setDailyClaimed(true));
    } finally {
      setClaiming(false);
    }
  }, [applyReward, claiming, dailyClaimed, dispatch]);

  const claimActionReward = useCallback(
    async (actionId: string) => {
      if (claiming) return;

      try {
        setClaiming(true);

        const response = await rewardsService.claimActionReward(actionId);

        await applyReward(response.amount, response.message);
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

        await applyReward(response.amount, response.message);
      } finally {
        setClaiming(false);
      }
    },
    [applyReward, claiming],
  );

  return {
    diamonds,
    keys,
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
  };
}
