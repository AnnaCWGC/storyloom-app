import { AppUser } from '@/domains/auth';

export function createMockUser(overrides: Partial<AppUser> = {}): AppUser {
  return {
    id: 'user-test',
    name: 'Tester',
    email: 'tester@storyloom.app',
    diamonds: 220,
    keys: 3,
    isVip: false,
    avatar: undefined,
    ...overrides,
  };
}
