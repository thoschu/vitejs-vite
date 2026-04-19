import js from '@eslint/js';
import globals from 'globals';
import tsEsLint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginSecurity from 'eslint-plugin-security';
import noSecrets from 'eslint-plugin-no-secrets';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser
    },
  },
  {
    extends: [
        js.configs.recommended,
      ...tsEsLint.configs.recommended
    ],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      security: pluginSecurity,
      "no-secrets": noSecrets,
    },
    ignores: ["__tests/**"],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-secrets/no-secrets': 'error',
    },
  },
  tsEsLint.configs.recommended,
]);
