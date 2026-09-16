module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    settings: { react: { version: 'detect' } },
    ignorePatterns: ['dist', 'node_modules', '*.config.*', 'tailwind.config.js'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        /* Prefer safer casts; the codebase deliberately uses `any` for framer refs. */
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-unused-vars': 'off',
    },
};