require("dotenv").config();

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
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
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};
