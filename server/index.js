/* eslint no-console: 0 */

const express = require('express'),
      fs = require('fs'),
      path = require('path'),
      webpack = require('webpack'),
      webpackConfig = require('../webpack.config.js'),
      WebpackDevServer = require('webpack-dev-server'),
      httpProxy = require('http-proxy'),
      port = require('../config.json').port,
      webpackPort = require('../config.json').webpackPort

const app = express(),
      webpackCompiler = webpack(webpackConfig),
      webpackProxy = httpProxy.createProxyServer({
        target: 'http://localhost:' + webpackPort,
        changeOrigin: true,
        ws: true
      })

let bundleStart,
    clientBuilt

// Ugly, but needed to implement emission of errors given a template is not able to be processed.
webpackConfig.webpackCompiler = webpackCompiler
webpackCompiler.plugin('compile', function() {
  process.stdout.write((clientBuilt ? 'Reb' : 'B') + 'undling client code ... ')
  bundleStart = Date.now()
})
webpackCompiler.plugin('done', function() {
  process.stdout.write('done (' + (Date.now() - bundleStart) + 'ms)\n')
  if(!clientBuilt) {
    clientBuilt = true
    startAppServer()
  }
})

const webpackDevServer = new WebpackDevServer(webpackCompiler, {
  contentBase: webpackConfig.output.path,
  historyApiFallback: true,
  hot: true,
  inline: true,
  quiet: false,
  noInfo: true,
  stats: { colors: true }
})
webpackDevServer.listen(webpackPort)

app.use(express.static('public'))

// initialize api paths
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
  if(file.match(/\.js$/)) {
    const method = file.replace(/\.js$/, '')
    app.get('/api/' + method + '(/?|/*)$', require('./api/' + method + '.js'))
  }
})
app.get('*', function(req, res) { webpackProxy.web(req, res) })

const startAppServer = () => app.listen(port, () => {
  process.stdout.write('\nComicServer web interface running on port ' + port + '\n\n')
})
