import * as THREE from 'three'

export class Renderer {
    constructor(canvas, scene) {
        this.canvas = canvas
        this.scene = scene

        this.setRendererInstance()
    }

    setRendererInstance() {
        this.rendererInstance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.rendererInstance.setSize(window.innerWidth, window.innerHeight)
        this.rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    renderInstance(camera) {
        this.rendererInstance.render(this.scene, camera)
    }

    rendererResize() {
        this.rendererInstance.setSize(window.innerWidth, window.innerHeight)
        this.rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}