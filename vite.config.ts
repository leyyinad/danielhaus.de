import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import type { UserConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import type { UserConfig as VitestUserConfig } from 'vitest/node';

export default {
  plugins: [enhancedImages(), sveltekit(), glsl()],

  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25% and not dead'))
    }
  },

  build: {
    cssMinify: 'lightningcss'
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
} satisfies UserConfig | { test: VitestUserConfig };
