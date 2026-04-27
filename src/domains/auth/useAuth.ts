import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { authService } from './auth.service';
import { login } from './auth.slice';
import { AuthResponse, LoginWithEmailPayload } from './auth.types';
import { setUser } from './user.slice';

export function useAuth() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    state => state.auth.isAuthenticated,
  );

  const user = useAppSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyAuthResponse = useCallback(
    (response: AuthResponse) => {
      dispatch(
        login({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );

      dispatch(setUser(response.user));
    },
    [dispatch],
  );

  const loginWithEmail = useCallback(
    async (payload: LoginWithEmailPayload) => {
      try {
        setLoading(true);
        setError(null);

        const response = await authService.loginWithEmail(payload);

        applyAuthResponse(response);

        return response;
      } catch {
        setError('Nao foi possivel entrar com e-mail.');
        throw new Error('EMAIL_LOGIN_FAILED');
      } finally {
        setLoading(false);
      }
    },
    [applyAuthResponse],
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.loginWithGoogle();

      applyAuthResponse(response);

      return response;
    } catch {
      setError('Nao foi possivel entrar com Google.');
      throw new Error('GOOGLE_LOGIN_FAILED');
    } finally {
      setLoading(false);
    }
  }, [applyAuthResponse]);

  const loginWithApple = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.loginWithApple();

      applyAuthResponse(response);

      return response;
    } catch {
      setError('Nao foi possivel entrar com Apple.');
      throw new Error('APPLE_LOGIN_FAILED');
    } finally {
      setLoading(false);
    }
  }, [applyAuthResponse]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
  };
}
