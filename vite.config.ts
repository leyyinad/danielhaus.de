import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig(() => ({
  plugins: [sveltekit(), glsl()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
}));
