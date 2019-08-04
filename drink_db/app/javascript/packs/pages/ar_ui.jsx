import React from 'react'
import { observer, inject } from 'mobx-react'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

// Yeah, this is hackish as fuck... but it works!


//import { Threexx } from 'ar.js'
// @inject(({ bottles: { list, refresh, loading } }) => {
//   return { refresh, list, loading }
// })
// @observer
export default class ArUIPage extends React.Component {
  componentDidMount() {
    this.rendererCss = new CSS3DRenderer()
    this.rendererCss.setSize(window.innerWidth, window.innerHeight)
    this.el.appendChild(this.rendererCss.domElement)

    this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 )
    this.camera.position.z = 3000
    this.scene = new THREE.Scene()

    const element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
    element.style.width = "30px";
    element.style.height = "30px";

    const object = new CSS3DObject(element)
    this.scene.add(object)

    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType : 'webcam'
    })

    this.arToolkitSource.init(this.onWindowResize)

    // this.renderer3d = new THREE.WebGLRenderer3d({ canvas: this.el })
    // this.renderer3d.setClearColor(new THREE.Color('red'), 0)
    // this.renderer3d.setPixelRatio(window.devicePixelRatio)
    // this.renderer3d.setSize(window.innerWidth, window.innerHeight)
    
    // this.scene	= new THREE.Scene()
    // this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    // this.scene.add(this.camera)

    // this.renderer3d.render(this.scene, this.camera)
    this.loop()
  }

  onWindowResize = () => {
    this.arToolkitSource.onResizeElement()
    this.arToolkitSource.copyElementSizeTo(renderer.domElement)
    if( this.arToolkitSource.arController !== null ){
			this.arToolkitSource.copyElementSizeTo(this.arToolkitSource.arController.canvas)
		}
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    // this.camera.updateProjectionMatrix();
    // this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  loop = () => {
    this.rendererCss.render(this.scene, this.camera)
    requestAnimationFrame(this.loop)
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
