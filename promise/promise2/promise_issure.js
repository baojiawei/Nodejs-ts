const fs = require('fs')
const path = require('path')

function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, url), 'utf8', function(err, data) {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
// 如果一个promise的then方法中的函数（成功和失败）返回的结果是一个promise的话，会自动将这个promise执行，并且采用他的状态
// 如果成功会将成功的结果向外层的下一个then传递
read('name.txt').then(data => {
  return read(data)
}, err => {
  console.log(err)
}).then(data => {
  console.log(data) //如果返回的是一个普通值，那么会将这个普通值作为下一次的成功的结果
  return false
}, err => {
  console.log(err)
}).then(data => {
  console.log(data)
  // 我希望这里不继续往下走then
  // 注意 throw new Error() 错误也会认为走到外层错误中
  return new Promise(() => {}) // 终止promise可以返回一个pending的promise
}).then(data => {
  console.log(data)
})

// 只有两种情况会失败，返回一个失败的promise或者抛出异常
// 每次执行promise的时候，都会返回一个新的promise实例
