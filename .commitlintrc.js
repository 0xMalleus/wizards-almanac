module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [0, 'never', null],
    'subject-case': [0],
    'footer-leading-blank': [0],
  },
  ignores: [(commit) => commit.includes('build(release)')],
};
