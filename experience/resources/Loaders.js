import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export class Loaders {
    constructor() {
        this.textureLoader = new THREE.TextureLoader()

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
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
}
