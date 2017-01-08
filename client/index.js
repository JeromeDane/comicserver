const api = require('./api/api.js'),
      indexView = require('./index.html')

const select = document.createElement('select')
select.innerHTML = '<option>Loading series series ...</option>'

api('series', series => {
  select.innerHTML = '<option>- series (' + Object.keys(series).length + ') -</option>'
  Object.keys(series).forEach(key => {
    const option = document.createElement('option')
    option.innerHTML = key + ' (' + series[key] + ')'
    select.append(option)
  })
  document.body.append(select)
})
