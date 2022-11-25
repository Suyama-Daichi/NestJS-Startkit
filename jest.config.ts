module.exports = async () => {
  return {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
      '@common/(.*)': '<rootDir>/src/common/$1',
      '@services/(.*)': '<rootDir>/src/services/$1',
      '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    },
  };
};