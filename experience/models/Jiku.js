// default mixer value to prevent scoping issues while animating
let mixer = null

// Jiku model
const jikuTexture = textureLoader.load('jikuBake.jpg')
jikuTexture.flipY = false
jikuTexture.colorSpace = THREE.SRGBColorSpace

const jikuMaterial = new THREE.MeshBasicMaterial({ map: jikuTexture })

jikuModelButton.addEventListener('click', () => {
    scene.clear()

    gltfLoader.load('jiku.glb', (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const tailAnimation = mixer.clipAction(gltf.animations[0])
        tailAnimation.repetitions = 3
    
        animationButton.addEventListener('click', () => { 
            tailAnimation.play()
            // resets animation from previous action so it's able to play again
            tailAnimation.reset()
        })
    
        const rig = gltf.scene.children.find((child) => {
            return child.name === 'rig'
        })
        const jikuMesh = rig.children[0]
        jikuMesh.material = jikuMaterial
    
        const flatGrassMesh = gltf.scene.children.find((child) => {
            return child.name === 'flatGrass'
        })
        flatGrassMesh.material = jikuMaterial
    
        const longGrassMesh = gltf.scene.children.find((child) => {
            return child.name === 'longGrass'
        })
        longGrassMesh.material = jikuMaterial
    
        scene.add(gltf.scene)
    })
})