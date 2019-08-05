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
    this.glRenderer = new THREE.WebGLRenderer({
      antialias: true,
		  alpha: true
    })
    this.glRenderer.setSize(window.innerWidth, window.innerHeight)
    this.glRenderer.setClearColor(new THREE.Color('lightgrey'), 0)
    this.glRenderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(this.glRenderer.domElement)

    this.container = container
    this.cssRenderer = new CSS3DRenderer()
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.cssRenderer.domElement)

    this.scene = new THREE.Scene()

    this.uiCamera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    this.uiCamera.position.z = 3000;
    this.glCamera = new THREE.PerspectiveCamera()
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
    this.scene.add(this.uiRoot)

    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.glCamera, {
      type : 'pattern',
      patternUrl : markerPatternUrl,
      changeMatrixMode: 'cameraTransformMatrix',
      smooth: true
    })

    // this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot, {
    //   type: 'pattern', 
    //   patternUrl: markerPatternUrl,
    //   smooth: false,
    // })

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
    element.style.width = "1px";
    element.style.height = "1px";

    const object = new CSS3DObject(element)
    this.uiRoot.add(object)

    var geometry	= new THREE.PlaneGeometry(1,1);
    var material	= new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    });

    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= geometry.parameters.height/2
    
    this.markerRoot.add(mesh)
  }

  onWindowResize = () => {
    this.arToolkitSource.onResizeElement()
    this.arToolkitSource.copyElementSizeTo(this.glRenderer.domElement)
    if( this.arToolkitContext.arController !== null ){
      this.glCamera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())
			this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
    }
    
    this.uiCamera.aspect = window.innerWidth / window.innerHeight
    this.uiCamera.updateProjectionMatrix()

    this.cssRenderer.setSize( window.innerWidth, window.innerHeight )
  }

  render = () => {
    requestAnimationFrame(this.render)
    if(this.arToolkitSource.ready) {
      this.arToolkitContext.update(this.arToolkitSource.domElement)
      this.scene.visible = this.glCamera.visible
    }

    this.glCamera.updateMatrixWorld()
    // this.uiRoot.position.copy(this.markerRoot.position)
    //                     .unproject(this.glCamera)
    //                     .project(this.uiCamera)
    // pobierz za pomoca glCamera pozycje obiektu na ekranie
    // zcastuj pozycje w pixelach na pozycje w uiCamera
    // this.uiRoot.rotation.copy(this.markerRoot.rotation)
    // this.uiRoot.updateMatrix()

    //console.log('position', this.tempVec3.set(0, 0, 0).unproject(this.glCamera).project(this.uiCamera))
    this.uiCamera.position.copy(this.glCamera.position)
    this.uiCamera.rotation.copy(this.glCamera.rotation)
    // this.uiCamera.zoom = -100
    this.uiCamera.updateMatrixWorld()
    // TODO just render buttons in canvas and put them on meshes?
    this.glRenderer.render(this.scene, this.glCamera)
    this.cssRenderer.render(this.scene, this.uiCamera)
  }
}