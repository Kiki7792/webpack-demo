import avatar from './saffron7.jpg'
import style from './index.scss'
import CreateAvatar from './createAvatar'

CreateAvatar()
let img = new Image()
img.src = avatar
img.classList.add(style.avatar)
// img.classList.add('avatar')

let root = document.getElementById('root')
root.appendChild(img)
