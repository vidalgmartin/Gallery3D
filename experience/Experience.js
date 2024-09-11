import * as THREE from 'three'
import { Camera } from './Camera'
import { Renderer } from './Renderer'
import { Loaders } from './resources/Loaders'

let animationButton = document.getElementById('animation-btn')
let rotationToggle = document.querySelector('.rotation-btn')

export class Experience {
    constructor(canvas) {
        // scene setup & utils
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.camera = new Camera(this.canvas, this.scene)
        this.renderer = new Renderer(this.canvas, this.scene)
        this.loaders = new Loaders()
        this.clock = new THREE.Clock()
        this.mixer = null
        this.model = null
        this.rotation = true

        // start loop to render the scene on every frame
        this.renderer.rendererInstance.setAnimationLoop(() => this.update())

        // model default rotation
        rotationToggle.addEventListener('click', () => this.toggleRotation())

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

        // default model rotation
        this.defaultRotation()
    }

    destroy() {
        // frees up all GPU resources created during render
        this.renderer.rendererInstance.dispose()

        // dispose orbit controls
        this.camera.controls.dispose()
    }

    isAnimated() {
        animationButton.classList.add('has-animation')
    }

    isNotAnimated() {
        animationButton.classList.remove('has-animation')
    }

    toggleRotation() {
        this.rotation = !this.rotation

        if (this.rotation) {
            rotationToggle.classList.remove('rotation-toggle')
            return
        }
        rotationToggle.classList.add('rotation-toggle')
    }

    defaultRotation() {
        if (this.model && this.rotation) {
            this.model.rotation.y += 0.002
        }
    }
    
    windowResize() {
        // Update camera aspect ratio
        this.camera.cameraResize()

        // Update window size to match the new dimensions
        this.renderer.rendererResize()
    }
}