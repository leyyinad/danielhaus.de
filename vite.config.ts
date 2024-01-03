import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { glslify } from 'vite-plugin-glslify';
import { skramble } from './skramble';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), glslify(), skramble({ mode, vars: ['CONTACT_EMAIL', 'CONTACT_PHONE'] })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
}));
