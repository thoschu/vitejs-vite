/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [
        dts({ tsconfigPath: './tsconfig.json' })
    ],
    build: {
        minify: false,
        lib: {
            entry: resolve(import.meta.dirname, 'src', 'index.ts'),
            name: 'mathVitePlugin',
            formats: [
                'es',
                'cjs',
                'umd',
                'iife'
            ]
        },
        rolldownOptions: {
            external: [
                'ramda',
                '@mlc-ai/web-llm',
                'uuid'
            ],
        }
    }
});

console.log('vite defineConfig math-plugin');
