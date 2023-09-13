import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src', '!src/**/*.spec.*', '!src/tests/**', '!src/**/mocks/**'],
  splitting: false,
  sourcemap: false,
  clean: false,
  dts: true
});
