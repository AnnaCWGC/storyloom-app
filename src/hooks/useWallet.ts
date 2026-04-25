import { useCallback, useState } from 'react';

import {
  walletService,
  WalletCurrency,
  WalletTransactionDTO,
} from '../services/walletService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addDiamonds as addDiamondsAction,
  addKeys as addKeysAction,
  spendDiamonds as spendDiamondsAction,
  spendKeys as spendKeysAction,
} from '../store/slices/userSlice';

export function useWallet() {
  const dispatch = useAppDispatch();

  const diamonds = useAppSelector(state => state.user?.diamonds ?? 0);
  const keys = useAppSelector(state => state.user?.keys ?? 0);

  const [loading, setLoading] = useState(false);

  const getBalanceByCurrency = useCallback(
    (currency: WalletCurrency) => {
      return currency === 'diamonds' ? diamonds : keys;
    },
    [diamonds, keys],
  );

  const canSpendCurrency = useCallback(
    (currency: WalletCurrency, amount: number) => {
      return getBalanceByCurrency(currency) >= amount;
    },
    [getBalanceByCurrency],
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
    [canSpendCurrency, dispatch],
  );

  const addDiamonds = useCallback(
    async (
      amount: number,
      reason: WalletTransactionDTO['reason'],
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
      reason: WalletTransactionDTO['reason'],
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
      reason: WalletTransactionDTO['reason'],
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
      reason: WalletTransactionDTO['reason'],
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
