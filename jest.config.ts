module.exports = async () => {
  return {
    setupFiles: ['<rootDir>/test/dotenv-config.js'],
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
      '@/(.*)': '<rootDir>/src/$1',
      '@common/(.*)': '<rootDir>/src/common/$1',
      '@services/(.*)': '<rootDir>/src/services/$1',
      '@controllers/(.*)': '<rootDir>/src/controllers/$1',
      '#node-web-compat': './node-web-compat-node.js',
    },
  };
};
