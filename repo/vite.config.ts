/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeBase = (basePath?: string): string => {
  if (!basePath) return '/';
  const trimmed = basePath.replace(/^\/+|\/+$/g, '');
  return trimmed.length > 0 ? `/${trimmed}/` : '/';
};

const repoBase = normalizeBase(process.env.VITE_BASE_PATH ?? 'telecom_idle');

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? repoBase : '/',
  plugins: [react()],
});