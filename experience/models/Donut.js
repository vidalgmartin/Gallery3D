import * as THREE from 'three'
import { Experience } from '../Experience'

// Donut model
export class Donut extends Experience {
    constructor(canvas) {    
        super(canvas)

        let texture = this.textureLoader.load('donutBake.jpg')
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace

        let material = new THREE.MeshBasicMaterial({ map: texture })

        this.gltfLoader.load('donut.glb', (gltf) => {
            gltf.scene.traverse((child) => {
                child.material = material
            })

            this.scene.add(gltf.scene)
        })
    }
}
