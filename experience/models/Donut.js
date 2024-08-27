import { Experience } from '../Experience'

// Donut model
export class Donut extends Experience {
    constructor(canvas) { 
        super(canvas)

        this.camera.cameraInstance.position.set(0, 1, 2)
        this.loaders.setMaterial('donutBake.jpg')

        this.loaders.gltfLoader.load('donut.glb', (gltf) => {
            gltf.scene.traverse((child) => {
                child.material = this.loaders.material
            })

            this.scene.add(gltf.scene)
        })
    }
}