var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve('./'),
    filename: './dist/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve('./'),
    watchContentBase: true,
    compress: true,
    port: 9000,
    hot: true
  }
};
