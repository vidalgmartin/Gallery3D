import * as THREE from 'three'
import { Camera } from './Camera'
import { Renderer } from './Renderer'
import { Loaders } from './resources/Loaders'

export class Experience {
    constructor(canvas) {
        // scene setup & utils
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.camera = new Camera(this.canvas, this.scene)
        this.renderer = new Renderer(this.canvas, this.scene)
        this.loaders = new Loaders()

        // clock for delta time
        this.clock = new THREE.Clock()

        // default mixer value for model animations
        this.mixer = null

        // start loop to render the scene on every frame
        this.renderer.rendererInstance.setAnimationLoop(() => this.update())

        // window resize
        window.addEventListener('resize', () => this.windowResize())
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