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
