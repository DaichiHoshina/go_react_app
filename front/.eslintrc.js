module.exports = {
  ignorePatterns: ["!.eslintrc.js", "!.babelrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // 必要に応じてルールを追加
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    // エクスポートされた関数とクラスのパブリッククラスメソッドに明示的な戻り値と引数の型を要求しない
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 未使用の変数を許可する
    "@typescript-eslint/no-unused-vars": "off",
    // 論理否定演算子を使用したnull以外のアサーションを許可する
    "@typescript-eslint/no-non-null-assertion": "off",
    // optional-chainにnull以外のアサーションを許可する
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    // 文字列やコメントの外に不規則な空白を許可する
    "no-irregular-whitespace": "off",
    // 条件に定数式入れるのを許可する
    "no-constant-condition": "off",
  },
};
