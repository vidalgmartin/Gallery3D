import * as THREE from 'three'
import { Experience } from '../Experience'

const animationButton = document.getElementById('animation-btn')

export class Jiku extends Experience {
    constructor(canvas) {
        super(canvas)

        this.setMaterial('jikuBake.jpg')

        this.gltfLoader.load('jiku.glb', (gltf) => {
            // updateds mixer value from the experience
            this.mixer = new THREE.AnimationMixer(gltf.scene)

            let tailAnimation = this.mixer.clipAction(gltf.animations[0])
            tailAnimation.repetitions = 3
        
            animationButton.addEventListener('click', () => { 
                tailAnimation.play()
                // resets animation from previous action so it's able to play again
                tailAnimation.reset()
            })
        
            let rig = gltf.scene.children.find((child) => {
                return child.name === 'rig'
            })
            rig.children[0].material = this.material
        
            let flatGrassMesh = gltf.scene.children.find((child) => {
                return child.name === 'flatGrass'
            })
            flatGrassMesh.material = this.material
        
            let longGrassMesh = gltf.scene.children.find((child) => {
                return child.name === 'longGrass'
            })
            longGrassMesh.material = this.material
        
            this.scene.add(gltf.scene)
        })
    }
}
