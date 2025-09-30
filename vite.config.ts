/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoBase = '/telecom_idle/';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? repoBase : '/',
  plugins: [react()],
});
