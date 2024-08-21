import { Experience } from './experience/Experience'
import { Donut } from './experience/models/Donut'
import { Jiku } from './experience/models/Jiku'

const canvas = document.querySelector('canvas.webgl')
const collectionButton = document.getElementById('collection-btn')
const donutModelButton = document.getElementById('donut-model')
const jikuModelButton = document.getElementById('jiku-model')

// initialize experience
new Experience(canvas)

donutModelButton.addEventListener('click', () => {
    new Donut(canvas)
})
 
jikuModelButton.addEventListener('click', () => {
    new Jiku(canvas)
})

// Ensures that the page starts at the top on refresh.
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

// smooth scroll into experience view
collectionButton.addEventListener('click', () => {
    canvas.scrollIntoView({ behavior: 'smooth' })
})