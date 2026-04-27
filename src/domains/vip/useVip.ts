import { useCallback, useState } from 'react';

import { setVipStatus } from '@/domains/auth/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { vipService } from './vip.service';
import { clearVipMetadata, setVipMetadata } from './vip.slice';

export function useVip() {
  const dispatch = useAppDispatch();

  const isVip = useAppSelector(state => state.user?.isVip ?? false);
  const vipMetadata = useAppSelector(state => state.vip);

  const [loading, setLoading] = useState(false);

  const startVipTrial = useCallback(async () => {
    try {
      setLoading(true);

      const response = await vipService.startTrial();

      dispatch(setVipStatus(true));
      dispatch(
        setVipMetadata({
          plan: response.plan,
          startedAt: response.startedAt,
          expiresAt: response.expiresAt,
          willRenew: response.willRenew,
        }),
      );

      return response;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const cancelVip = useCallback(async () => {
    try {
      setLoading(true);

      const response = await vipService.cancel();

      dispatch(setVipStatus(response.isVip));

      if (!response.isVip) {
        dispatch(clearVipMetadata());
      } else {
        dispatch(
          setVipMetadata({
            expiresAt: response.expiresAt,
            willRenew: response.willRenew,
          }),
        );
      }

      return response;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  /**
   * Apenas para desenvolvimento/mock.
   * No app real, isso deve ser removido e substituido por purchase flow.
   */
  const toggleVipMock = useCallback(async () => {
    if (isVip) {
      await cancelVip();
      return;
    }

    await startVipTrial();
  }, [cancelVip, isVip, startVipTrial]);

  return {
    isVip,
    loading,
    plan: vipMetadata.plan,
    startedAt: vipMetadata.startedAt,
    expiresAt: vipMetadata.expiresAt,
    willRenew: vipMetadata.willRenew,
    startVipTrial,
    cancelVip,
    toggleVipMock,
  };
}
