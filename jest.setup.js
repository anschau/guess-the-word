/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);
jest.mock('react-native-share', () => ({
  __esModule: true,
  default: { open: jest.fn() },
}));
jest.mock('react-native-view-shot', () => ({ captureRef: jest.fn() }));
