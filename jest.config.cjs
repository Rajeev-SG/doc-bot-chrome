module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/front-end/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lucide-react|@lucide|@babel/runtime)/)'
  ]
};
