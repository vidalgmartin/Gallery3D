import { Experience } from './experience/Experience'
import { Donut } from './experience/models/Donut'
import { Jiku } from './experience/models/Jiku'

const canvas = document.querySelector('canvas.webgl')
const collectionButton = document.getElementById('collection-btn')
const modelButtons = document.querySelectorAll('.model-button')
const donutModelButton = document.getElementById('donut-model')
const jikuModelButton = document.getElementById('jiku-model')

// Ensures that the page starts at the top on refresh.
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

// smooth scroll into experience view
collectionButton.addEventListener('click', () => {
    canvas.scrollIntoView({ behavior: 'smooth' })
})

modelButtons.forEach(modelBtn => {
    modelBtn.addEventListener('click', () => {
        // loop through the nodeList again to remove the class from all the buttons
        modelButtons.forEach(button => button.classList.remove('is-active'))

        // then re-add the class only to that specific button
        modelBtn.classList.add('is-active')
    })
})

// initialize experience
let experience = new Experience(canvas)

donutModelButton.addEventListener('click', () => {
    if (experience) {
        experience.destroy()
    }
    experience = new Donut(canvas)
})
 
jikuModelButton.addEventListener('click', () => {
    if (experience) {
        experience.destroy()
    }
    experience = new Jiku(canvas)
})