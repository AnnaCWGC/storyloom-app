import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import {
  createTestStore,
  TestRootState,
  TestStore,
} from './createTestStore';

type RenderHookWithProvidersOptions = {
  preloadedState?: Partial<TestRootState>;
  store?: TestStore;
};

export function renderHookWithProviders<Result>(
  callback: () => Result,
  options: RenderHookWithProvidersOptions = {},
) {
  const store = options.store ?? createTestStore(options.preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...renderHook(callback, {
      wrapper: Wrapper,
    }),
  };
}
