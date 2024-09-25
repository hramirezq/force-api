module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    },
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
