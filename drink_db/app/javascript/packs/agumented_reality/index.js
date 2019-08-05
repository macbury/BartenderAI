// Yeah, this is hackish as fuck... but it works!
import  "script-loader!aframe"
// import  "script-loader!three"
import  "script-loader!./../../../../node_modules/ar.js/three.js/build/ar.js"
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import cameraParametersUrl from '../../../../node_modules/ar.js/data/data/camera_para.dat'
import markerPatternUrl from '../../../../node_modules/ar.js/data/data/patt.hiro'
//import markerPatternUrl from './pattern-marker.patt'

// check marker root
// move camera as farher
// sync with css style
export default class AgumentedReality {
  constructor(container) {
    this.glRenderer = new THREE.WebGLRenderer({
      antialias: true,
		  alpha: true
    })
    this.glRenderer.setSize(window.innerWidth, window.innerHeight)
    this.glRenderer.setClearColor(new THREE.Color('lightgrey'), 0)
    container.appendChild(this.glRenderer.domElement)

    this.container = container
    this.cssRenderer = new CSS3DRenderer()
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.cssRenderer.domElement)

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

    this.markerRoot = new THREE.Group()
    this.scene.add(this.markerRoot)

    // this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
    //   type : 'pattern',
    //   patternUrl : markerPatternUrl,
    //   changeMatrixMode: 'cameraTransformMatrix'
    // })

    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot, {
      type: 'pattern', 
      patternUrl
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

    var geometry	= new THREE.CubeGeometry(1,1,1);
    var material	= new THREE.MeshNormalMaterial({
      transparent : true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });

    var mesh	= new THREE.Mesh( geometry, material );
	  mesh.position.y	= geometry.parameters.height/2
    this.markerRoot.add(mesh)
  }

  onWindowResize = () => {
    this.arToolkitSource.onResizeElement()
    this.arToolkitSource.copyElementSizeTo(this.cssRenderer.domElement)
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
    
    this.glRenderer.render(this.scene, this.camera)
    this.cssRenderer.render(this.scene, this.camera)    
  }
}