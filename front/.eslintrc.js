module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ["!.eslintrc.js", "!.babelrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // import 文でモジュールを使用
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-hooks", "@typescript-eslint", "react", "prettier", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  root: true,
  // React のバージョンは自動検出に
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
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
    // TypeScirpt なので prop-types は要らない
    "react/prop-types": "off",
  },
};
