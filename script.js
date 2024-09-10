import { Donut } from './experience/models/Donut'
import { Jiku } from './experience/models/Jiku'

const canvas = document.querySelector('canvas.webgl')
const logo = document.querySelector('.logo')
const rotationToggle = document.querySelector('.description-btn')
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

// experience model buttons
modelButtons.forEach(modelBtn => {
    modelBtn.addEventListener('click', () => {
        // loop through the nodeList again to remove the class from all the buttons
        modelButtons.forEach(button => button.classList.remove('is-active'))

        // then re-add the class only to that specific button
        modelBtn.classList.add('is-active')
    })
})

// default experience value to avoid rendering in home page
let experience = null

donutModelButton.addEventListener('click', () => {
    rotationToggle.classList.remove('activeToggle')

    if (experience) {
        experience.destroy()
    }
    experience = new Donut(canvas)
})
 
jikuModelButton.addEventListener('click', () => {
    rotationToggle.classList.remove('activeToggle')
    
    if (experience) {
        experience.destroy()
    }
    experience = new Jiku(canvas)
})