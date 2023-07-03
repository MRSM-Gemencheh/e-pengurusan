const path = require('path');

module.exports = {
    mode: "development",
    entry: {
      mainPage: './src/mainPage/index.js',
      listingPage: './src/listingPage/senarai.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
  };