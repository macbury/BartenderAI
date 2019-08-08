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
    this.tempVec3 = new THREE.Vector3()
    this.tempVec2 = new THREE.Vector2()
    this.cameraTimeout = 0.0
    this.glRenderer = new THREE.WebGLRenderer({
      antialias: true,
		  alpha: true
    })
    this.clock = new THREE.Clock();
    this.glRenderer.setSize(window.innerWidth, window.innerHeight)
    this.glRenderer.setClearColor(new THREE.Color('lightgrey'), 0)
    this.glRenderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(this.glRenderer.domElement)

    this.container = container

    this.scene = new THREE.Scene()
    this.glCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100)
    this.scene.add(this.glCamera)

    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType : 'webcam'
    })

    this.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl,
      detectionMode: 'mono',
    })

    this.arToolkitSource.init(this.onWindowResize)
    this.arToolkitContext.init(() => {
      this.glCamera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())
      this.onWindowResize()
    })

    this.markerRoot = new THREE.Group()
    this.uiRoot = new THREE.Group()
    this.scene.add(this.markerRoot)

    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.glCamera, {
      type : 'pattern',
      patternUrl : markerPatternUrl,
      changeMatrixMode: 'cameraTransformMatrix',
      smooth: true
    })

    window.addEventListener('resize', this.onWindowResize)
    document.body.className = "ar-mode"
    this.scene.visible = false
    this.onWindowResize()

    this.render()
  }

  addComponent() {
    var geometry	= new THREE.PlaneGeometry(2,2);
    var material	= new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    });
    geometry.rotateZ(THREE.Math.degToRad(-90))

    var mesh	= new THREE.Mesh( geometry, material );
    mesh.rotation.x = -Math.PI/2;
    
    
    this.markerRoot.add(mesh)
  }

  onWindowResize = () => {
    this.glRenderer.setSize(window.innerWidth, window.innerHeight)
    this.arToolkitSource.onResizeElement()
    this.arToolkitSource.copyElementSizeTo(this.glRenderer.domElement)
    if( this.arToolkitContext.arController !== null ){
      this.glCamera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())
			this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
    }
  }

  render = () => {
    requestAnimationFrame(this.render)
    if(this.arToolkitSource.ready) {
      this.arToolkitContext.update(this.arToolkitSource.domElement)
      if (this.glCamera.visible) {
        this.cameraTimeout = 3.0
      } else {
        this.cameraTimeout -= this.clock.getDelta()
      }
      
      this.scene.visible = (this.cameraTimeout >= 0.0)
    }

    this.glRenderer.render(this.scene, this.glCamera)
  }
}