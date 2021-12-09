const path = require('path');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  devtool: false,
  entry: {
    main: './src/app.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
