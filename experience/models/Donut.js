import { Experience } from '../Experience'

// Donut model
export class Donut extends Experience {
    constructor(canvas) { 
        super(canvas)

        this.camera.cameraInstance.position.set(0, 1, 2)
        this.setMaterial('donutBake.jpg')

        this.gltfLoader.load('donut.glb', (gltf) => {
            gltf.scene.traverse((child) => {
                child.material = this.material
            })

            this.scene.add(gltf.scene)
        })
    }
}