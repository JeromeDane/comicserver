
module.exports = ({ db, field, resolve }) => {
  db.find({ $where: function() { return Boolean(this[field]) }}, (err, comics) => {
    if(err) throw err
    else {
      const sorted = {}
      const unsorted = comics.reduce((acc, comic) => {
        if(typeof comic[field] === 'object' && comic[field].length) {
          comic[field].forEach(val =>
            acc[val] = typeof acc[val] === 'undefined' ? 1 : acc[val] + 1
          )
        }
        else acc[comic[field]] = typeof acc[comic[field]] === 'undefined' ? 1 : acc[comic[field]] + 1
        return acc
      }, {})
      Object.keys(unsorted).sort().forEach(field => sorted[field] = unsorted[field])
      resolve(JSON.stringify(sorted))
    }
  })
}
