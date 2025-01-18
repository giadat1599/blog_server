import pluginJs from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js built-ins
            'external', // Third-party modules
            'internal', // Internal modules (e.g., `@/utils`)
            ['parent', 'sibling', 'index'] // Relative imports
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
