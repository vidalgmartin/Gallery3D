import { Experience } from '../Experience'

export class Donut extends Experience { 
    constructor(canvas) { 
        super(canvas)

        this.camera.cameraInstance.position.set(1, 2, 3)
        this.scene.position.set(0, -0.5, 0)
        this.camera.controls.minDistance = 2.5
        this.loaders.setMaterial('donutBake.jpg')

        this.loadModel()
        this.isNotAnimated()
    }

    loadModel() {
        this.loaders.gltfLoader.load('donut.glb', (gltf) => {
            gltf.scene.traverse((child) => child.material = this.loaders.material)
            
            this.scene.add(gltf.scene)
        })
    }
}