/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';

const { cwd } = process;

export default defineConfig(async ({command, mode}) => {
    const env = loadEnv(mode, cwd(), '');
    const response = await fetch(`http://localhost:3000/${env.API_ENDPOINT}`);
    const viteConfig = await response.json();

    console.log(command);

    if (command === 'serve') {
        return {
            plugins: [],
            ...viteConfig,
            envPrefix: ['VITE_', 'API_'],
            build: {
                minify: false,
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index.html'),
                        admin: resolve(__dirname, 'admin/index.html'),
                    }
                }
            }
        }
    } else {
        // command === 'build'
        return {
            build: {
                minify: false,
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index.html'),
                        admin: resolve(__dirname, 'admin/index.html'),
                    }
                }
            }
        }
    }
});

console.log('vite defineConfig vanilla-app');
