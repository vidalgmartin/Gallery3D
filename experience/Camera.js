import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export class Camera{
    constructor(canvas, scene) {
        this.canvas = canvas
        this.scene = scene

        this.setCameraInstance()
        this.setOrbitControls()
    }

    setCameraInstance() {
        this.cameraInstance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.scene.add(this.cameraInstance)
    }

    cameraResize() {
        this.cameraInstance.aspect = window.innerWidth / window.innerHeight
        this.cameraInstance.updateProjectionMatrix()
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.cameraInstance, this.canvas)
        this.controls.enablePan = false
        this.controls.maxPolarAngle = 1.5
        this.controls.maxDistance = 8
        this.controls.minDistance = 4
    }

    updateOrbitControls() {
        this.controls.update()
    }
}