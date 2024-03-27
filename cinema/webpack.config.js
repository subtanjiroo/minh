const dotenv = require("dotenv-webpack");

module.exports = {
  Plugin: [new dotenv({})],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      stream: require.resolve("stream-browserify"),
      querystring: require.resolve("querystring-es3"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      http: require.resolve("stream-http"),
      util: require.resolve("util/"),
    },
  },
};
