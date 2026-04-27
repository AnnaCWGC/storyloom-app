import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  setMatureContentPreference,
  setNotificationPreference,
  setReduceMotionPreference,
} from './profile.slice';

export function useProfilePreferences() {
  const dispatch = useAppDispatch();

  const preferences = useAppSelector(state => state.profile.preferences);

  const setNotificationsEnabled = useCallback(
    (value: boolean) => {
      dispatch(setNotificationPreference(value));
    },
    [dispatch],
  );

  const setMatureContentEnabled = useCallback(
    (value: boolean) => {
      dispatch(setMatureContentPreference(value));
    },
    [dispatch],
  );

  const setReduceMotionEnabled = useCallback(
    (value: boolean) => {
      dispatch(setReduceMotionPreference(value));
    },
    [dispatch],
  );

  return {
    preferences,
    setNotificationsEnabled,
    setMatureContentEnabled,
    setReduceMotionEnabled,
  };
}
