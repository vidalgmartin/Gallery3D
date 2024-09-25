import { Donut } from './experience/models/Donut'
import { Jiku } from './experience/models/Jiku'

const canvas = document.querySelector('canvas.webgl')
const logo = document.querySelector('.logo')
const rotationToggle = document.querySelector('.rotation-btn')
const collectionButton = document.getElementById('collection-btn')
const modelButtons = document.querySelectorAll('.model-button')
const donutModelButton = document.getElementById('donut-model')
const jikuModelButton = document.getElementById('jiku-model')

// Ensures that the page starts at the top on refresh.
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

// browser refresh on logo click
logo.addEventListener('click', () => {
    window.location.reload()
})

// smooth scroll into experience view
collectionButton.addEventListener('click', () => {
    canvas.scrollIntoView({ behavior: 'smooth' })
})

// default experience value to avoid rendering in home page
let experience = null

// experience model buttons
modelButtons.forEach(modelBtn => {
    modelBtn.addEventListener('click', () => {
        // dispose of resources before creating new ones
        if (experience) {
            experience.destroy()
        }
        
        // loop through the nodeList again to remove the class from all the buttons
        // then re-add the class only to that specific button
        modelButtons.forEach(button => button.classList.remove('is-active'))
        modelBtn.classList.add('is-active')

        //remove class from button used to toggle the default rotation animation
        rotationToggle.classList.remove('rotation-toggle')

        rotationToggle.classList.add('show-rotation-btn')

        // experience initializers by model
        if (modelBtn === donutModelButton) {
            experience = new Donut(canvas)
        }
        if (modelBtn === jikuModelButton) {
            experience = new Jiku(canvas)
        }
    })
})