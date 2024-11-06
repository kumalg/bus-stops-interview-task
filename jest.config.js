module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\js$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    moduleFileExtensions: ['vue', 'js', 'ts'],
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons']
    }
};
