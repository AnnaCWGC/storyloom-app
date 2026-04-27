process.env.EXPO_PUBLIC_USE_MOCKS = 'true';
process.env.EXPO_PUBLIC_API_URL = '';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
