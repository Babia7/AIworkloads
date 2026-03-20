import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.ts'],
    globals: true,
    exclude: ['node_modules', 'e2e/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['hooks/**', 'utils/**'],
      exclude: ['node_modules', '__tests__', 'e2e', 'scripts'],
      thresholds: { lines: 80, functions: 80 },
    },
  },
});
