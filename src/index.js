/**
 * 第1种方式
 * 首次访问页面加载main.js(2MB)
 * 打包文件会很大，加载时间会长
 * 
 * 当页面业务逻辑发生变化时, 又要加载2MB的内容 
 */

// console.log(_.join(['a', 'b', 'c'])) // a, b, c String
// 此处省略1000行业务逻辑 // 1mb
console.log(_.join(['a', 'b', 'cd'], '***')) // a***b***c

/**
 * 第2种方式
 * 拆分lodash.js(1MB)和main.js(1MB)
 * 当页面业务逻辑发生变化时， 只要加载main.js即可(1MB)
 */

 // Code Splitting
 