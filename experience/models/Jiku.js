import * as THREE from 'three'
import { Experience } from '../Experience'

const animationButton = document.getElementById('animation-btn')

export class Jiku extends Experience {
    constructor(canvas) {
        super(canvas)

        this.camera.cameraInstance.position.set(1.5, 4, 5)
        this.scene.position.set(0, -1, 0)
        this.loaders.setMaterial('jikuBake.jpg')
        
        this.loadModel()
        this.isAnimated()
    }

    loadModel() {
        this.loaders.gltfLoader.load('jiku.glb', (gltf) => {
            let jikuRig = gltf.scene.children.find(child => child.name === 'rig')
            jikuRig.children[0].material = this.loaders.material

            let flatGrassMesh = gltf.scene.children.find((child) => child.name === 'flatGrass')
            flatGrassMesh.material = this.loaders.material
        
            let longGrassMesh = gltf.scene.children.find((child) => child.name === 'longGrass')
            longGrassMesh.material = this.loaders.material

            // updateds mixer value from the experience
            this.mixer = new THREE.AnimationMixer(gltf.scene)

            let tailAnimation = this.mixer.clipAction(gltf.animations[0])
            tailAnimation.repetitions = 3
        
            animationButton.addEventListener('click', () => { 
                tailAnimation.play()
                // resets animation from previous action so it's able to play again
                tailAnimation.reset()
            })
        
            this.scene.add(gltf.scene)
            this.model = gltf.scene
        })
    }
}