import React from 'react'
import { observer, inject } from 'mobx-react'
import AgumentedReality from '../agumented_reality'

//import { Threexx } from 'ar.js'
// @inject(({ bottles: { list, refresh, loading } }) => {
//   return { refresh, list, loading }
// })
// @observer
export default class ArUIPage extends React.Component {
  componentDidMount() {
    this.ar = new AgumentedReality(this.el)
    this.ar.addComponent()
  }

  render() {
    return (
      <div ref={(ref) => this.el = ref} className="ar-container"></div>
    )
  }
}
