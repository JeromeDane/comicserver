const express = require('express'),
      library = require('./lib/library.js'),
      port = require('../config.json').port

const app = express()

app.get('/', (req, res) => {
  library.count({}, (err, count) => {
    res.send('Hello World! ' + count + ' comics already scanned!')
  })
})

app.get('/api/files/?', require('./files.js'))
app.get('/api/series/?', require('./series.js'))
app.get('/api/scan-library/?', require('./scan-library.js'))

app.listen(port, () => {
  process.stdout.write('ComicServer web interface available on port ' + port + '\n')
})
