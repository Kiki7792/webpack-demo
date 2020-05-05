import avatar from './saffron7.jpg'
import style from './index.scss'

function CreateAvatar () {
  let img = new Image()
  img.src = avatar
  img.classList.add(style.avatar)

  let root = document.getElementById('root')
  root.appendChild(img)
}

export default CreateAvatar