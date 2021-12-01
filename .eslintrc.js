module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off",
    "no-alert": "off",
    "func-names": "off",
    "import/extensions": "always",
  },
  globals: {
    TPDirect: true,
    FB: true,
  },
};
