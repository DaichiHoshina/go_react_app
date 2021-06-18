module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["styled-components", { ssr: true, displayName: true, preprocess: false }],
    ["macros"],
  ],
  overrides: [
    {
      include: ["./node_modules"],
      plugins: [
        [
          "babel-plugin-transform-require-ignore",
          {
            extensions: [".css"],
          },
        ],
      ],
    },
  ],
};
