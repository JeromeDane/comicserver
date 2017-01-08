const cfg = require('../config.json'),
      updateComic = require('./lib/update-comic.js'),
      getLibraryFiles = require('./lib/library-files.js'),
      library = require('./lib/library.js')

const scanNextFile = (files, i, resolve) => {
  const file = files[i],
        startTime = (new Date()).getTime()

  // res.write('Scanning ' + file + '\n')
  process.stdout.write('Scanning ' + file + ' ... ')
  updateComic({
    comic: { path: file },
    library,
    libraryPath: cfg.libraryPath,
    resolve: () => {
      process.stdout.write(((new Date()).getTime() - startTime) + 'ms\n')
      if(i < files.length - 1) scanNextFile(files, i + 1, resolve)
      else resolve()
    }
  })
}

// module.exports = (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  scanNextFile(getLibraryFiles(cfg.libraryPath), 0, () => console.log('DONE!'))
// }
