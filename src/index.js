// import './style.css'

// let btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function () {
//   let div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

import counter from './ccounter'
import number from './number'
counter()
number()
if (module.hot) {
  /**
   * @param1 文件名 相對路徑
   * @param2 執行函數cb
   */
  module.hot.accept('./number', () => {
    // 熱更新前, 把之前渲染的number清除, 然後重新挂載
    document.body.removeChild(document.getElementById('number'))
    number()
  })
}