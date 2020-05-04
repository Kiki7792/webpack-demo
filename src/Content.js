function Content () {
  let dom = document.getElementById('root')
  let content = document.createElement('div')
  content.innerText = 'content'
  dom.appendChild(content)
}

export default Content