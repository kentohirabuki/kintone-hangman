// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 140,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  bracketSpacing: false,
  bracketSameLine: false,
  arrowParens: 'avoid',
};

export default config;
