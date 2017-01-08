const HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack'),
      // webpackPort = require('./config.json').webpackPort,
      path = require('path')

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:' + webpackPort,
    // 'webpack/hot/dev-server',
    './client/app.jsx'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: path.resolve(__dirname, 'src'), loader: 'source-map' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
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
  ],
  devtool: '#inline-source-map'
}
