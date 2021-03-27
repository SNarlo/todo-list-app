const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": false,
      "crypto": false,
      "buffer": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "url": false,
      "vm": false,
      "querystring": false,
      "os": false,
      "constants": false,
      "assert": false,
    }
  },
};