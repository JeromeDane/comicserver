import { h, render, Component } from 'preact'
import Comic from './comic.jsx'
import api from './api/api.js'

class ComicServer extends Component {
  constructor() {
    super()
    this.state = {
      series: {},
      comics: [],
      files: []
    }
    api('series', series => this.setState({ series, seriesLoaded: true }))
    api('comics', comics => this.setState({ comics, comicsLoaded: true }))
  }

  render() {
    const state = this.state,
          counts = this.state.series,
          series = Object.keys(this.state.series),
          comics = this.state.comics,
          filteredComics = comics.reduce((acc, comic) => {
            acc.push(comic)
            return acc
          }, [])

    return (
      <div class="header">
        <h1>Comic Server</h1>
        <p>
          {state.comicsLoaded
            ? <span>
                Showing {filteredComics.length.toLocaleString()} of {' '}
                {comics.length.toLocaleString()} comics in the library.
              </span>
            : <span>Loading comics ...</span>
          }
        </p>
        <p>
          <strong>Series:</strong> {' '}
          <select>
            <option>{series.length ? '- Any Series (' + series.length + ') -' : 'Loading Series ...'}</option>
            {series.map(name => <option>{name} ({counts[name]})</option>)}
          </select>
        </p>
        {comics.map(comic => <Comic comic={comic}/>)}
      </div>
    )
  }
}

render(<ComicServer />, document.body)
