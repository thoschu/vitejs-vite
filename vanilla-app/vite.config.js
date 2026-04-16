/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv } from 'vite';

const { cwd } = process;

export default defineConfig(async ({command, mode}) => {
    const env = loadEnv(mode, cwd(), '');
    const response = await fetch(`http://localhost:3000/${env.API_ENDPOINT}`);
    const build = await response.json();

    if (command === 'serve') {
        return {
            plugins: [],
            server: {
                port: 4300,
            },
            envPrefix: ['VITE_', 'API_'],
            ...build
        }
    } else {
        // command === 'build'
        return {
            ...build
        }
    }
});

console.log('vite defineConfig vanilla-app');
