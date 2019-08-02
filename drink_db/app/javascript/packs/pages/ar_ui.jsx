import React from 'react'
import { observer, inject } from 'mobx-react'
import Three from 'three'
import { Threexx } from 'ar.js'
// @inject(({ bottles: { list, refresh, loading } }) => {
//   return { refresh, list, loading }
// })
// @observer
export default class ArUIPage extends React.Component {
  componentDidMount() {
  }

  render() {
    //https://threejs.org/examples/?q=css3d#css3d_periodictable
    // show grid with list of drinks
    // you can tap to make a drink
    // if there is a drink in queue show a progressbar
    return (
      <p>Works</p>
    )
  }
}
