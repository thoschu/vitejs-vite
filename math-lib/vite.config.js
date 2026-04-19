/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.build.json'
        }),
        analyzer()
    ],
    build: {
        minify: false,
        lib: {
            entry: resolve(import.meta.dirname, 'src', 'index.ts'),
            name: 'mathViteLib',
            formats: ['es', 'cjs', 'umd', 'iife']
        },
        rolldownOptions: {
            external: ['ramda', '@mlc-ai/web-llm', 'uuid'],
            output: {
                globals: {
                    ramda: 'ramda',
                    uuid: 'uuid',
                    '@mlc-ai/web-llm': 'webllm'
                }
            }
        }
    }
});

console.log('vite defineConfig math-plugin');
