import { h, Component } from 'preact'

export default class Comic extends Component {
  render({comic}) {
    return (
      <p>{comic.path}</p>
    )
  }
}
