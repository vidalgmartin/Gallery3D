import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class Experience {
    constructor(canvas) {
        // scene setup & utils
        this.canvas = canvas

        this.scene = new THREE.Scene()
        this.scene.position.set(0, -1, 0)

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(1.5, 2, 5)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enablePan = false
        this.controls.maxPolarAngle = 1.5
        this.controls.maxDistance = 8
        this.controls.minDistance = 5

        // loaders
        this.textureLoader = new THREE.TextureLoader()

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        // render config
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // clock for delta time
        this.clock = new THREE.Clock()

        // default mixer value for model animations
        this.mixer = null

        // start loop to render the scene on every frame
        this.renderer.setAnimationLoop(() => this.animate())

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

    destroy() {
        // frees up all GPU resources created during render
        this.renderer.dispose()
    }
    
    animate() {
        // looks for mixer value for model animation
        if (this.mixer) {
            this.mixer.update(this.clock.getDelta())
        }

        // renderer setup
        this.renderer.render(this.scene, this.camera)
    }
    
    windowResize() {
        const width = window.innerWidth
        const height = window.innerHeight

        // Update camera aspect ratio
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        // Update window size to match the new dimensions
        this.renderer.setSize(width, height)
    }
}