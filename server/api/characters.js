const library = require('../lib/library')

module.exports = (req, res) => {
  library.find({ $where: function() { return (typeof this.characters === 'object' && this.characters.length > 0) }}, (err, comics) => {
    if(err) throw err
    else {
      const characters = comics.reduce((acc, comic) => {
        comic.characters.forEach(character => {
          if(acc.indexOf(character) === -1) acc.push(character)
        })
        return acc
      }, [])
      res.send(JSON.stringify(characters.sort()))
    }
  })
}
