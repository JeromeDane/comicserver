const library = require('../lib/library')

module.exports = (req, res) => {
  library.find({}, (err, comics) => {
    res.send(JSON.stringify(comics))
  })
}
