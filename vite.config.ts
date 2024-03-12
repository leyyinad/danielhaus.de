import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import { skramble } from './skramble';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), glsl(), skramble({ mode, vars: ['CONTACT_EMAIL', 'CONTACT_PHONE'] })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
}));
