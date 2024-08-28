import { Experience } from '../Experience'

export class Donut extends Experience { 
    constructor(canvas) { 
        super(canvas)

        this.camera.cameraInstance.position.set(1, 1, 2)
        this.loaders.setMaterial('donutBake.jpg')

        this.loadModel()
    }

    loadModel() {
        this.loaders.gltfLoader.load('donut.glb', (gltf) => {
            gltf.scene.traverse((child) => child.material = this.loaders.material)
            
            this.scene.add(gltf.scene)
        })
    }
}