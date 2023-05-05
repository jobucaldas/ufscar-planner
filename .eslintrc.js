module.exports = {
  "env": {
    "jest/globals": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "jest",
    "react",
    "@typescript-eslint",
    "eslint-plugin-tsdoc",
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": "off",
    "react/prop-types": "off",
    "tsdoc/syntax": "warn",
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "curly": ["error", "multi-line"],
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error"],
    "array-element-newline": ["error", "consistent"],
    "arrow-parens": ["error"],
    "arrow-spacing": ["error"],
    "block-spacing": ["error"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error"],
    "computed-property-spacing": ["error"],
    "dot-location": ["error", "property"],
    "eol-last": ["error"],
    "func-call-spacing": ["error"],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "multiline-arguments"],
    "key-spacing": ["error"],
    "keyword-spacing": ["error"],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "new-parens": ["error"],
    "newline-per-chained-call": ["error"],
    "no-extra-parens": ["error"],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-whitespace-before-property": ["error"],
    "nonblock-statement-body-position": ["error"],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true },
    ],
    "operator-linebreak": ["error", "after"],
    "padded-blocks": ["error", "never"],
    "rest-spread-spacing": ["error"],
    "semi-spacing": ["error"],
    "semi-style": ["error"],
    "space-before-blocks": ["error"],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error"],
    "space-infix-ops": ["error"],
    "space-unary-ops": ["error"],
    "switch-colon-spacing": ["error"],
    "template-curly-spacing": ["error"],
    "template-tag-spacing": ["error"],
    "wrap-iife": ["error", "inside"],
    "no-namespace": "off",
  },
  "globals": {
    "__CLIENT__": true,
    "__SERVER__": true,
    "__DEV__": true,
  },
};
