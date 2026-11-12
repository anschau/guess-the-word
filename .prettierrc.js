module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        semi: false,
      },
    },
  ],
};
