// promisify 把一个node的API，转换成promsie的写法
const fs = require('fs')
const path = require('path')
// const util = require('util')

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        // node中的回调函数的参数，第一个永远是error
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}
// 自己实现一个read方法，进行包装
// let read = util.promisify(fs.readFile)
let read = promisify(fs.readFile)

read(path.join(__dirname, './name.txt'), 'utf8').then((data) => {
  console.log(data)
})

const promisifyAll = (target) => {
  Reflect.ownKeys(target).forEach((key) => {
    if (typeof target[key] === 'function') {
      target[key + 'Async'] = promisify(target[key])
    }
  })
  return target
}
// bluebird 第三方模块
// 默认会将原有的方法 全部增加一个async后缀 变成promise的写法
const newFs = promisifyAll(fs) 
newFs.readFileAsync(path.join(__dirname, './name.txt'), 'utf8').then((data) => {
  console.log(data)
})
