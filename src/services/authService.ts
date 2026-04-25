import { env } from '../config/env';
import { AuthResponse, LoginWithEmailPayload } from '../types/user';
import { apiClient } from './apiClient';

const mockAuthResponse: AuthResponse = {
  user: {
    id: 'user-1',
    name: 'Anna',
    email: 'anna@storyloom.app',
    diamonds: 220,
    keys: 3,
    isVip: false,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const authService = {
  async loginWithEmail(
    payload: LoginWithEmailPayload,
  ): Promise<AuthResponse> {
    if (env.USE_MOCKS) {
      await delay(350);

      return {
        ...mockAuthResponse,
        user: {
          ...mockAuthResponse.user,
          email: payload.email || mockAuthResponse.user.email,
        },
      };
    }

    return apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: payload,
    });
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    if (env.USE_MOCKS) {
      await delay(350);
      return mockAuthResponse;
    }

    return apiClient<AuthResponse>('/auth/google', {
      method: 'POST',
    });
  },

  async loginWithApple(): Promise<AuthResponse> {
    if (env.USE_MOCKS) {
      await delay(350);
      return mockAuthResponse;
    }

    return apiClient<AuthResponse>('/auth/apple', {
      method: 'POST',
    });
  },

  async logout(): Promise<void> {
    if (env.USE_MOCKS) {
      await delay(150);
      return;
    }

    await apiClient<void>('/auth/logout', {
      method: 'POST',
    });
  },
};
