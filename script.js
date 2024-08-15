import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const collectionButton = document.getElementById('collection-btn')
const animationButton = document.getElementById('animation-btn')
const jikuModelButton = document.getElementById('jiku-model')
const donutModelButton = document.getElementById('donut-model')

// Ensures that the page starts at the top on refresh.
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

collectionButton.addEventListener('click', () => {
    canvas.scrollIntoView({ behavior: 'smooth' })
})

// THREE JS
/**
 * SCENE SETUP & UTILS
 */
const scene = new THREE.Scene()
scene.position.set(0, -1, 0)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(1.5, 2, 5)

const controls = new OrbitControls(camera, canvas)
controls.enablePan = false
controls.maxPolarAngle = 1.5
controls.maxDistance = 8
controls.minDistance = 5

// loaders
const textureLoader = new THREE.TextureLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// default mixer value to prevent scoping issues while animating
let mixer = null

/**
 * 3D MODELS
 */
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

// Donut model
const donutTexture = textureLoader.load('donutBake.jpg')
donutTexture.flipY = false
donutTexture.colorSpace = THREE.SRGBColorSpace

const donutMaterial = new THREE.MeshBasicMaterial({ map: donutTexture })

donutModelButton.addEventListener('click', () => {
    scene.clear()

    gltfLoader.load('donut.glb', (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = donutMaterial
        })
    
        scene.add(gltf.scene)
    })
})

/**
 * RENDERER
 */
// render config
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// clock for delta time
const clock = new THREE.Clock()

// loop to animate and render the scene on every frame
const animate = () => {
    renderer.render(scene, camera)

    // update mixer
    if (mixer) {
        mixer.update(clock.getDelta())
    }
}
renderer.setAnimationLoop(animate)

// handles screen resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight

    // Update camera aspect ratio
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // Update window size to match the new dimensions
    renderer.setSize(width, height)
})