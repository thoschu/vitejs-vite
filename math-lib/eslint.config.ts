import js from '@eslint/js';
import globals from 'globals';
import tsEsLint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginSecurity from 'eslint-plugin-security';
import noSecrets from 'eslint-plugin-no-secrets';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser
    }
  },
  {
    extends: [js.configs.recommended, ...tsEsLint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser
    },
    plugins: {
      'no-secrets': noSecrets,
      security: pluginSecurity,
      prettier: eslintPluginPrettier
    },
    ignores: ['__tests/**'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-secrets/no-secrets': 'error',
      'prettier/prettier': 'warn'
    }
  },
  tsEsLint.configs.recommended,
  eslintConfigPrettierFlat
]);
