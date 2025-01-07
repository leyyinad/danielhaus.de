import type { PlaywrightTestConfig } from '@playwright/test';

export default {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 8000
  },

  testDir: 'e2e'
} as PlaywrightTestConfig;
