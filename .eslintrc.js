module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['eslint:recommended', 'next/core-web-vitals', "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
        '*.ts',
        '*.tsx',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'indent': 'off'
  },
};
