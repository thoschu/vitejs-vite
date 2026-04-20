/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv } from 'vite';
import strip from '@rollup/plugin-strip';
import { DevTools } from '@vitejs/devtools';
import removeConsole from 'vite-plugin-remove-console';
import { resolve } from 'node:path';
import legacy from '@vitejs/plugin-legacy';

const { cwd } = process;

function manualChunks(id) {
    console.log(id);

    if (id.includes('node_modules')) {
        return 'vendor';
    }

    return null;
}

export default defineConfig(async ({command, mode}) => {
    const env = loadEnv(mode, cwd(), '');
    const response = await fetch(`http://localhost:3000/${env.API_ENDPOINT}`);
    const viteConfig = await response.json();

    console.log(command);

    if (command === 'serve') {
        return {
            plugins: [
                await DevTools()
            ],
            ...viteConfig,
            envPrefix: ['VITE_', 'API_'],
            build: {
                minify: false
            }
        }
    } else {
        // command === 'build'
        return {
            plugins: [
                removeConsole(),
                legacy({
                    targets: ['defaults', 'not IE 11'],
                }),
                strip({
                    labels: ['unittest']
                })
            ],
            build: {
                minify: false,
                rolldownOptions: {
                    input: {
                        main: resolve(import.meta.dirname, 'index.html'),
                        admin: resolve(import.meta.dirname, 'admin/index.html'),
                    },
                    output: {
                        manualChunks
                    }
                }
            }
        }
    }
});

console.log('vite defineConfig vanilla-app');
