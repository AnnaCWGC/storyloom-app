export type WalletCurrency = 'diamonds' | 'keys';

export type WalletBalanceDTO = {
  diamonds: number;
  keys: number;
};

export type WalletTransactionReason =
  | 'reward'
  | 'premium_choice'
  | 'chapter_entry'
  | 'purchase'
  | 'admin_adjustment'
  | 'chapter_completion'
  | 'daily_bonus'
  | 'key_recharge';

export type WalletTransactionDTO = {
  currency: WalletCurrency;
  amount: number;
  reason: WalletTransactionReason;
  referenceId?: string;
};
