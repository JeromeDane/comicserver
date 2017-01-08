const library = require('../lib/library'),
      getUniqueEntities = require('./lib/entity-count.js')

module.exports = (req, res) => getUniqueEntities({
  db: library,
  field: 'teams',
  resolve: entities => res.send(entities)
})
