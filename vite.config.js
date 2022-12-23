import react from '@vitejs/plugin-react';
import reload from 'vite-plugin-full-reload';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reload('**'), react()],
  server: { hmr: false },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      all: true,
      reportsDirectory: './out/coverage',
      reporter: ['text-summary', 'html', 'lcov'],
      include: ['src/**/*'],
      exclude: ['**/*.d.ts', '**/__*', '**/*.test.*', '**/*.spec.*'],
    },
  },
});
