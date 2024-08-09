import * as THREE from 'three'

/**
 * THREE JS
 */
// scene utilities
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)

// 3D model
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// render config
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// loop to animate and render the scene on every frame
const animate = () => {
    cube.rotation.x += 0.01
	cube.rotation.y += 0.01

    renderer.render(scene, camera)
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