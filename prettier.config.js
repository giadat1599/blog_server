/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: 'always',
  semi: false,
  trailingComma: 'none',
  tabWidth: 2,
  endOfLine: 'auto',
  useTabs: false,
  singleQuote: true,
  printWidth: 120,
  jsxSingleQuote: true,
  importOrder: [
    '^(express/(.*)$)|^(express$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/db/(.*)$',
    '',
    '^@/services/(.*)$',
    '',
    '^@/middlewares/(.*)$',
    '',
    '^@/routes/(.*)$',
    '',
    '^@/lib/(.*)$',
    '',
    '^@/utils/(.*)$',
    '',
    '^[./]'
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports']
}
