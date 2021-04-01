module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: { '\\.css$': 'identity-obj-proxy' },
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
}
