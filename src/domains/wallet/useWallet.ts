import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  addDiamonds as addDiamondsAction,
  addKeys as addKeysAction,
  spendDiamonds as spendDiamondsAction,
  spendKeys as spendKeysAction,
} from '@/domains/auth/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { setKeysRechargeStartedAt } from './keysRecharge.slice';
import { walletService } from './wallet.service';
import {
  WalletCurrency,
  WalletTransactionDTO,
  WalletTransactionReason,
} from './wallet.types';

const MAX_KEYS = 3;
const KEY_RECHARGE_MS = 8 * 60 * 60 * 1000;

export function useWallet() {
  const dispatch = useAppDispatch();

  const diamonds = useAppSelector(state => state.user?.diamonds ?? 0);
  const keys = useAppSelector(state => state.user?.keys ?? 0);
  const isVip = useAppSelector(state => state.user?.isVip ?? false);
  const rechargeStartedAt = useAppSelector(
    state => state.keysRecharge.rechargeStartedAt,
  );

  const [loading, setLoading] = useState(false);
  const [rechargeTick, setRechargeTick] = useState(Date.now());

  const nextKeyAt = useMemo(() => {
    if (!rechargeStartedAt || keys >= MAX_KEYS || isVip) {
      return null;
    }

    return new Date(
      new Date(rechargeStartedAt).getTime() + KEY_RECHARGE_MS,
    ).toISOString();
  }, [isVip, keys, rechargeStartedAt]);

  useEffect(() => {
    if (!rechargeStartedAt || keys >= MAX_KEYS || isVip) return;

    const interval = setInterval(() => {
      setRechargeTick(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isVip, keys, rechargeStartedAt]);

  useEffect(() => {
    void rechargeTick;

    if (isVip) {
      dispatch(setKeysRechargeStartedAt(null));
      return;
    }

    if (keys >= MAX_KEYS) {
      dispatch(setKeysRechargeStartedAt(null));
      return;
    }

    if (!rechargeStartedAt) {
      dispatch(setKeysRechargeStartedAt(new Date().toISOString()));
      return;
    }

    const startedAtMs = new Date(rechargeStartedAt).getTime();
    const nowMs = Date.now();
    const elapsed = nowMs - startedAtMs;

    if (elapsed < KEY_RECHARGE_MS) return;

    const keysToRecover = Math.floor(elapsed / KEY_RECHARGE_MS);
    const nextKeyCount = Math.min(MAX_KEYS, keys + keysToRecover);
    const recoveredKeys = nextKeyCount - keys;

    if (recoveredKeys <= 0) return;

    dispatch(addKeysAction(recoveredKeys));

    if (nextKeyCount >= MAX_KEYS) {
      dispatch(setKeysRechargeStartedAt(null));
      return;
    }

    const remainderMs = elapsed % KEY_RECHARGE_MS;
    const newStartedAt = new Date(Date.now() - remainderMs).toISOString();

    dispatch(setKeysRechargeStartedAt(newStartedAt));
  }, [dispatch, isVip, keys, rechargeStartedAt, rechargeTick]);

  const getBalanceByCurrency = useCallback(
    (currency: WalletCurrency) => {
      return currency === 'diamonds' ? diamonds : keys;
    },
    [diamonds, keys],
  );

  const canSpendCurrency = useCallback(
    (currency: WalletCurrency, amount: number) => {
      if (isVip && currency === 'keys') {
        return true;
      }

      return getBalanceByCurrency(currency) >= amount;
    },
    [getBalanceByCurrency, isVip],
  );

  const addCurrency = useCallback(
    async (payload: WalletTransactionDTO) => {
      try {
        setLoading(true);

        const response = await walletService.addCurrency(payload);

        if (response.currency === 'diamonds') {
          dispatch(addDiamondsAction(response.amount));
        } else {
          dispatch(addKeysAction(response.amount));
        }

        return response;
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const spendCurrency = useCallback(
    async (payload: WalletTransactionDTO) => {
      if (isVip && payload.currency === 'keys') {
        return payload;
      }

      if (!canSpendCurrency(payload.currency, payload.amount)) {
        throw new Error(
          payload.currency === 'diamonds'
            ? 'INSUFFICIENT_DIAMONDS'
            : 'INSUFFICIENT_KEYS',
        );
      }

      try {
        setLoading(true);

        const response = await walletService.spendCurrency(payload);

        if (response.currency === 'diamonds') {
          dispatch(spendDiamondsAction(response.amount));
        } else {
          dispatch(spendKeysAction(response.amount));
        }

        return response;
      } finally {
        setLoading(false);
      }
    },
    [canSpendCurrency, dispatch, isVip],
  );

  const addDiamonds = useCallback(
    async (
      amount: number,
      reason: WalletTransactionReason,
      referenceId?: string,
    ) => {
      return addCurrency({
        currency: 'diamonds',
        amount,
        reason,
        referenceId,
      });
    },
    [addCurrency],
  );

  const spendDiamonds = useCallback(
    async (
      amount: number,
      reason: WalletTransactionReason,
      referenceId?: string,
    ) => {
      return spendCurrency({
        currency: 'diamonds',
        amount,
        reason,
        referenceId,
      });
    },
    [spendCurrency],
  );

  const addKeys = useCallback(
    async (
      amount: number,
      reason: WalletTransactionReason,
      referenceId?: string,
    ) => {
      return addCurrency({
        currency: 'keys',
        amount,
        reason,
        referenceId,
      });
    },
    [addCurrency],
  );

  const spendKeys = useCallback(
    async (
      amount: number,
      reason: WalletTransactionReason,
      referenceId?: string,
    ) => {
      return spendCurrency({
        currency: 'keys',
        amount,
        reason,
        referenceId,
      });
    },
    [spendCurrency],
  );

  return {
    diamonds,
    keys,
    isVip,
    maxKeys: MAX_KEYS,
    nextKeyAt,
    loading,

    getBalanceByCurrency,
    canSpendCurrency,

    addCurrency,
    spendCurrency,

    addDiamonds,
    spendDiamonds,
    addKeys,
    spendKeys,
  };
}
