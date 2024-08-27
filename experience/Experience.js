import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Camera } from './Camera'
import { Renderer } from './Renderer'

export class Experience {
    constructor(canvas) {
        // scene setup & utils
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.camera = new Camera(this.canvas, this.scene)
        this.renderer = new Renderer(this.canvas, this.scene)

        // loaders
        this.textureLoader = new THREE.TextureLoader()

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        // // render config
        // this.renderer = new THREE.WebGLRenderer({
        //     canvas: this.canvas,
        //     antialias: true
        // })
        // this.renderer.setSize(window.innerWidth, window.innerHeight)
        // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // clock for delta time
        this.clock = new THREE.Clock()

        // default mixer value for model animations
        this.mixer = null

        // start loop to render the scene on every frame
        this.renderer.rendererInstance.setAnimationLoop(() => this.update())

        // window resize
        window.addEventListener('resize', () => this.windowResize())
    }

    setMaterial(textureImage) {
        // dispose of old textures and materials if they exist
        if (this.texture) {
            this.texture.dispose()
        }
        if (this.material) {
            this.material.dispose()
        }

        this.texture = this.textureLoader.load(textureImage)
        this.texture.flipY = false
        this.texture.colorSpace = THREE.SRGBColorSpace

        this.material = new THREE.MeshBasicMaterial({ map: this.texture })
    }
    
    update() {
        // looks for mixer value for model animation
        if (this.mixer) {
            this.mixer.update(this.clock.getDelta())
        }

        // renderer update
        this.renderer.renderInstance(this.camera.cameraInstance)

        // orbit controls update
        this.camera.updateOrbitControls()
    }

    destroy() {
        // frees up all GPU resources created during render
        this.renderer.rendererInstance.dispose()
    }
    
    windowResize() {
        // Update camera aspect ratio
        this.camera.cameraResize()

        // Update window size to match the new dimensions
        this.renderer.rendererResize()
    }
}