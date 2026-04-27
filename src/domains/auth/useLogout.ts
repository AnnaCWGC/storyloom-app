import { useCallback, useState } from 'react';

import { clearLibrary } from '@/domains/library';
import { resetProfilePreferences } from '@/domains/profile';
import { resetAllStoryProgress } from '@/domains/progress';
import { resetRewardsState } from '@/domains/rewards';
import { clearVipMetadata } from '@/domains/vip';
import { setKeysRechargeStartedAt } from '@/domains/wallet';
import { useAppDispatch } from '@/store/hooks';

import { authService } from './auth.service';
import { logout } from './auth.slice';
import { clearUser } from './user.slice';

export function useLogout() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);

      await authService.logout();

      dispatch(resetAllStoryProgress());
      dispatch(clearLibrary());
      dispatch(resetRewardsState());
      dispatch(clearVipMetadata());
      dispatch(setKeysRechargeStartedAt(null));
      dispatch(resetProfilePreferences());

      dispatch(clearUser());
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    loading,
    logout: handleLogout,
  };
}
