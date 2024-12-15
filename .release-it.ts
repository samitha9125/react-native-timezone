import type { Config } from 'release-it';

export default {
  git: {
    commit: true,
    tag: true,
    push: true,
    requireBranch: 'main',
  },
  npm: {
    publish: true,
  },
} satisfies Config;
