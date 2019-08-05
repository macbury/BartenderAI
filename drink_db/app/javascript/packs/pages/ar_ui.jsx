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
    //https://threejs.org/examples/?q=css3d#css3d_periodictable
    // show grid with list of drinks
    // you can tap to make a drink
    // if there is a drink in queue show a progressbar
    return (
      // <canvas ref={(ref) => this.el = ref} className="ar-container"></canvas>
      <div ref={(ref) => this.el = ref} className="ar-container"></div>
    )
  }
}
