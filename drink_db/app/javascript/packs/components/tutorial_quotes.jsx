import React from 'react'
import { observer, inject } from 'mobx-react'

@inject(({ recipes: { collection } }) => {
  return { collection }
})
@observer
export default class TutorialQuotes extends React.Component {
  render() {
    return (
      <blockquote className="blockquote text-center">
        <p className="mb-0">Alexa, ask Bartender to make Vodka Sunrise</p>
        <footer className="blockquote-footer">Example commands</footer>
      </blockquote>
    )
  }
}
