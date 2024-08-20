import { Donut } from './experience/models/Donut'

const canvas = document.querySelector('canvas.webgl')
const collectionButton = document.getElementById('collection-btn')

// initialize experience
const donut = new Donut(canvas)

// Ensures that the page starts at the top on refresh.
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

// smooth scroll into experience view
collectionButton.addEventListener('click', () => {
    canvas.scrollIntoView({ behavior: 'smooth' })
})