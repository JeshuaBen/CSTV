module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|expo-modules-core|@expo(nent)?/.*|@expo-google-fonts/.*|@shopify/flash-list|@testing-library/react-native|nativewind|react-native-safe-area-context)/)',
  ],
  collectCoverageFrom: [
    'src/shared/components/**/*.{ts,tsx}',
    'src/features/**/hooks/**/*.{ts,tsx}',
    'src/features/**/screens/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types.ts',
    '!**/types.tsx',
    '!**/tokens.ts',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
