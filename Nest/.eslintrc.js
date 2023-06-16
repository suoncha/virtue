module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase'],
        leadingUnderscore: 'allowDouble',
        trailingUnderscore: 'allowDouble',
      },
      {
        selector: 'variable',
        modifiers: ['exported'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allowDouble',
        trailingUnderscore: 'allowDouble',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ]
  },
};
