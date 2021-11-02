import './index.scss'
import avatar from './avatar.jpg'

let root = document.getElementById('root')

let img = new Image()
img.classList.add('avatar')
img.src = avatar
root.appendChild(img)
