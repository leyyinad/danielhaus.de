import {
  PUBLIC_BUILD_DATE,
  PUBLIC_GITHUB_REF_NAME,
  PUBLIC_GITHUB_RELEASE_VERSION,
  PUBLIC_GITHUB_SHA
} from '$env/static/public';

const release = PUBLIC_GITHUB_RELEASE_VERSION;
const branch = PUBLIC_GITHUB_REF_NAME;
const commit = PUBLIC_GITHUB_SHA;
const buildDate = PUBLIC_BUILD_DATE;

const version = release ? release : [branch, commit?.substring(0, 7)].filter(Boolean).join('-');

export { branch, buildDate, commit, release, version };
