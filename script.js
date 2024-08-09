import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// THREE JS

/**
 * SCENE SETUP
 */
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.5, 5)

const controls = new OrbitControls(camera, canvas)

/**
 * 3D MODEL
 */
// loaders
const textureLoader = new THREE.TextureLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// material
const jikuTexture = textureLoader.load('baked.jpg')
jikuTexture.flipY = false
jikuTexture.colorSpace = THREE.SRGBColorSpace

const jikuMaterial = new THREE.MeshBasicMaterial({ map: jikuTexture })

// default mixer value to prevent scoping issues while animating
let mixer = null

// mesh
gltfLoader.load('jiku.glb', (gltf) => {
    mixer = new THREE.AnimationMixer(gltf.scene)
    const tailAnimation = mixer.clipAction(gltf.animations[0])
    tailAnimation.play()

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