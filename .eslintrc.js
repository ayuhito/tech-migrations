module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
