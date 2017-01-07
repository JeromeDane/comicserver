const getLibraryFiles = require('./lib/library-files.js')

// module.exports = (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   let numScanned = 0
//   const files = getLibraryFiles(cfg.libraryPath)
//   files.forEach(file => {
//     res.write('Scanning ' + file + '\n')
//     updateComic({
//       comic: { path: file },
//       library,
//       libraryPath: cfg.libraryPath,
//       resolve: comic => {
//         numScanned++
//         res.write('Scanned ' + comic.title)
//         if(numScanned === files.length) res.end()
//       }
//     })
//   })
// }

module.exports = (req, res) => {
  res.send(JSON.stringify(getLibraryFiles()))
}
