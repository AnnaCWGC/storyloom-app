import { rewardsService } from '@/domains/rewards';

describe('rewardsService', () => {
  it('returns 12 diamonds for regular daily reward', async () => {
    const response = await rewardsService.claimDailyReward({ isVip: false });

    expect(response.amount).toBe(12);
    expect(response.message).toContain('+12');
  });

  it('returns 30 diamonds for VIP daily reward', async () => {
    const response = await rewardsService.claimDailyReward({ isVip: true });

    expect(response.amount).toBe(30);
    expect(response.message).toContain('+30');
  });

  it('returns diamond packs', async () => {
    const packs = await rewardsService.getDiamondPacks();

    expect(packs.length).toBeGreaterThan(0);
    expect(packs[0]).toHaveProperty('id');
    expect(packs[0]).toHaveProperty('amount');
  });

  it('claims a reward action', async () => {
    const response = await rewardsService.claimActionReward('bonus-scene');

    expect(response.amount).toBe(15);
  });
});
