const getLibraryFiles = require('../lib/library-files.js')

module.exports = (req, res) => {
  res.send(JSON.stringify(getLibraryFiles()))
}
