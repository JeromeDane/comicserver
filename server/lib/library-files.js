const fs = require('fs'),
      path = require('path'),
      libraryPath = require('../../config.json').libraryPath

const isDir = path => fs.statSync(path).isDirectory(),
      isComicFile = file => file.match(/\.(cb(z|r)|7z|zip|rar)$/)

const getDirFiles = (libraryPath, dirPath) => {
  let files = []
  fs.readdirSync(path.join(libraryPath, dirPath)).forEach(file => {
    if(!file.match(/^\./)) {
      file = path.join(dirPath, file)
      if(isDir(path.join(libraryPath, file))) files = files.concat(getDirFiles(libraryPath, file))
      else if(isComicFile(file)) files.push(file)
    }
  })
  return files
}

module.exports = () => {
  let files = []
  fs.readdirSync(libraryPath).forEach(file => {
    if(!file.match(/^\./)) {
      if(isDir(path.join(libraryPath, file))) files = files.concat(getDirFiles(libraryPath, file))
      // if(isDir(path.join(libraryPath, file))) files = files
      else if(isComicFile(file)) files.push(file)
    }
  })
  return files
}
