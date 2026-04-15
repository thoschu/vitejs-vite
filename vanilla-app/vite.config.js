/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv } from 'vite';

const { cwd } = process;

export default defineConfig(async ({command, mode}) => {
    const env = loadEnv(mode, cwd(), '');
    const response = await fetch(`http://localhost:3000/${env.API_ENDPOINT}`);
    const result = await response.json();

    return {
        ...result
    }
});

console.log('vite defineConfig vanilla-app');
