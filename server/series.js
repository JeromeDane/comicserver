const library = require('./lib/library')

module.exports = (req, res) => {
  library.find({ $where: function() { return Boolean(this.series) }}, (err, comics) => {
    if(err) throw err
    else {
      const series = comics.reduce((acc, comic) => {
        if(acc.indexOf(comic.series) === -1) acc.push(comic.series)
        return acc
      }, [])
      res.send(JSON.stringify(series.sort()))
    }

  })
}
