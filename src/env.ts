import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  PUBLIC_BUILD_DATE: { public: true, static: true },
  PUBLIC_GITHUB_REF_NAME: { public: true, static: true },
  PUBLIC_GITHUB_RELEASE_VERSION: { public: true, static: true },
  PUBLIC_GITHUB_SHA: { public: true, static: true }
});
