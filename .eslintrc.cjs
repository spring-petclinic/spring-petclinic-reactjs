module.exports = {
  env: { browser: true, es2020: true },
  extends: ['universe/web'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'import/order': 0
  }
};
