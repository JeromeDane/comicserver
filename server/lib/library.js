const cfg = require('../../config.json'),
      fs = require('fs'),
      path = require('path'),
      Datastore = require('nedb')

const isDir = path => fs.statSync(path).isDirectory()

if(!isDir(cfg.libraryPath)) throw new Error('Library path "' + cfg.libraryPath + '" is not a directory')

module.exports = new Datastore({
  filename: path.join(cfg.libraryPath, '.comicserver/library.db'),
  autoload: true
})
