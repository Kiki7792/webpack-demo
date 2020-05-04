function SideBar () {
  let dom = document.getElementById('root')
  let sidebar = document.createElement('div')
  sidebar.innerText = 'sidebar'
  dom.appendChild(sidebar)
}

export default SideBar