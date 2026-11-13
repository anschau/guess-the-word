module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['react-native-gesture-handler/jestSetup.js', './jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-native-vector-icons|@react-navigation|react-native-gesture-handler|react-native-screens|react-intl|@formatjs|intl-messageformat)/)',
  ],
};
