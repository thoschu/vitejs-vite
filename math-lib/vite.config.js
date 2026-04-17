/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
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
    }
});

console.log('vite defineConfig math-plugin');
