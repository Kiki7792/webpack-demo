// 同步加载
// import _ from 'lodash'
// console.log(_.join(['a', 'b', 'cd'], '***')) // a***b***c

// 异步加载async await
// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */'lodash')
  
//   return elem
// }

document.addEventListener('click', () => {
  // import('./click').then(({ default: func }) => {
  /**
   * Prefetch会等待核心code加载完成, 网络空闲再加载Prefetch的code 有兼容性问题
   */
  // import(/* webpackPrefetch: true */ './click').then(({ default: func }) => {
    /**
     * Preload: 和核心code一起加载
     */
  import(/* webpackPreload: true */ './click').then(({ default: func }) => {
    func()
  })
})

// // 异步加载
// function getComponent() {
//   // 异步代码 使用 magicChunkName 给分割的文件命名
//   return import(/* webpackChunkName:"lodash" */'lodash').then(({ default: _ }) => {
//     let elem = document.createElement('div')
//     elem.innerHTML = _.join(['a', 'b', 'cd'], '+')
//     return elem
//   })
// }

// document.addEventListener('click', () => {
//   getComponent().then(elem => {
//     document.body.appendChild(elem)
//   })
// })


/**
 * 代码分割与webpack无关
 * webpack中实现代码分割, 两种方式
 * 1. 同步代码(从上往下执行)
 * 只需要在webpack.common.js中
 * optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
 * 
 * 2. 异步代码(import): 无需做任何配置, 会自动进行代码分割, 放置到dist文件中
 */