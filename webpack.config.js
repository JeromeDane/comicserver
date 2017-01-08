const HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack'),
      webpackPort = require('./config.json').webpackPort,
      path = require('path')

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:' + webpackPort,
    // 'webpack/hot/dev-server',
    './client/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'underscore-template' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'ComicServer'
    })
  ]
}
