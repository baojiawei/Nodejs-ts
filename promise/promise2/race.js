// Promise.all 方法 所有的都成功了 才算成功 如果有一个失败就走失败

// Promise.race 采用最先成功或者最先失败的作为结果
const fs = require('fs').promises
const path = require('path')

let readFiles = [
  fs.readFile(path.join(__dirname, 'name.txt'), 'utf8'),
  fs.readFile(path.join(__dirname, 'age.txt'), 'utf8'),
]

// 多个请求 采用最快的 或者可以自己封装中断方法
Promise.race(readFiles)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

// 中断器 abort
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 6000)
})

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const promiseLength = promises.length
    for (let i = 0; i < promiseLength; i++) {
      let value = promises[i]
      if (value && typeof value.then === 'function') {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    }
  })
}
// xhr.abort() ajax有自己的中断方法 axios基于ajax实现的
// fetch和ajax没关系 fetch基于promise，他的请求是无法中断的
function wrap(promise) {
  let abort
  let newPromise = new Promise((resolve, reject) => {
    abort = reject
  })
  let p = Promise.race([promise, newPromise])
  p.abort = abort
  return p
}
let newPromise = wrap(promise)
setTimeout(() => {
  newPromise.abort('超时了')
}, 3000)
newPromise
  .then((data) => {
    console.log('成功的结果', data)
  })
  .catch((e) => {
    console.log('失败的结果', e)
  })
