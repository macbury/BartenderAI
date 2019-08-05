// Yeah, this is hackish as fuck... but it works!
import  "script-loader!aframe"
// import  "script-loader!three"
import  "script-loader!./../../../../node_modules/ar.js/three.js/build/ar.js"
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import cameraParametersUrl from '../../../../node_modules/ar.js/data/data/camera_para.dat'
//import markerPatternUrl from '../../../../node_modules/ar.js/data/data/patt.hiro'
import markerPatternUrl from './pattern-marker.patt'

export default class AgumentedReality {
  constructor(container) {
    this.container = container
    this.rendererCss = new CSS3DRenderer()
    this.rendererCss.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.rendererCss.domElement)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera()
    this.scene.add(this.camera)

    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType : 'webcam'
    })

    this.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl,
      detectionMode: 'mono',
    })

    this.arToolkitSource.init(this.onWindowResize)
    this.arToolkitContext.init(() => {
      this.camera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())
      this.onWindowResize()
    })

    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
      type : 'pattern',
      patternUrl : markerPatternUrl,
      changeMatrixMode: 'cameraTransformMatrix'
    })

    window.addEventListener('resize', this.onWindowResize)
    document.body.style.overflow = 'hidden'
    this.scene.visible = false
    this.onWindowResize()

    this.render()
  }

  addComponent() {
    const element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
    element.style.width = "120px";
    element.style.height = "120px";

    const object = new CSS3DObject(element)
    this.scene.add(object)

    // var geometry	= new THREE.CubeGeometry(1,1,1);
    // var material	= new THREE.MeshNormalMaterial({
    //   transparent : true,
    //   opacity: 0.5,
    //   side: THREE.DoubleSide
    // });
    // var mesh	= new THREE.Mesh( geometry, material );
    // mesh.position.y	= geometry.parameters.height/2
    // this.scene.add( mesh );
    // var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
    // var material	= new THREE.MeshNormalMaterial();
    // var mesh	= new THREE.Mesh( geometry, material );
    // mesh.position.y	= 0.5
    // this.scene.add( mesh );
  }

  onWindowResize = () => {
    this.arToolkitSource.onResizeElement()
    this.arToolkitSource.copyElementSizeTo(this.rendererCss.domElement)
    if( this.arToolkitContext.arController !== null ){
      this.camera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())
			this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
		}
  }

  render = () => {
    requestAnimationFrame(this.render)
    if(this.arToolkitSource.ready) {
      this.arToolkitContext.update(this.arToolkitSource.domElement)
      this.scene.visible = this.camera.visible
    }
    
    this.rendererCss.render(this.scene, this.camera)    
  }
}