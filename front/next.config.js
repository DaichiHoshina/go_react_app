require("dotenv").config();

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/presentations",
        permanent: true,
      },
    ];
  },
  typescript: {
    // TODO: プロジェクトに型エラーがあったとしても、プロダクションビルドを正常に完了するために危険な許可をする。
    ignoreBuildErrors: true,
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL,
  },
};
