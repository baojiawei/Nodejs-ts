// generator = redux-saga(generator) 可以暂停

// generator 生成器 生成迭代器的 iterator

// 类数组转化为数组
// [...arguments] Array.from(arguments)

// 有索引 有长度 能遍历

// let likeArray = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 } // 默认这样写的数组是不能被迭代的，缺少迭代语法
// js的基础数据类型有哪些，Symbol中有很多"元编程"的方法，可以更改js本身的功能

// likeArray[Symbol.iterator] = function () {
//   // 迭代器是一个对象， 对象中有next方法，每次调用next，都需要返回一个对象{value, done}
//   let index = 0
//   return {
//     next: () => {
//       return {value:this[index], done: index++ === this.length}
//     }
//   }
// }
// likeArray[Symbol.iterator] = function *() {
//   // 迭代器是一个对象， 对象中有next方法，每次调用next，都需要返回一个对象{value, done}
//   let index = 0
//   while(index !== this.length) {
//     yield this[index++]
//   }
// }
// console.log([...likeArray])
// console.log(Array.from(likeArray))
// 迭代器的作用，没有迭代器的数据，不能被迭代

// 生成器，es6的一个api
// function * read() { // gengerator函数，碰到yield 就会暂停
//   yield 1
//   yield 2
// }
// // 生成器返回的是迭代器
// let it = read()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// 通过generator来优化promise(promise的缺点是不停的回调 不停的链式调用)
const fs = require('fs').promises
const path = require('path')

// function* read() {
//   // try {
//   //   let content = yield fs.readFile(path.join(__dirname, 'name.txt'), 'utf8')
//   //   let age = yield fs.readFile(path.join(__dirname, content), 'utf8')
//   //   return age
//   // } catch (error) {
//   //   console.log(error, '******')
//   // }
//   let content = yield fs.readFile(path.join(__dirname, 'name.txt'), 'utf8')
//   let age = yield fs.readFile(path.join(__dirname, content), 'utf8')
//   return age
// }
// function co(it) {
//   return new Promise((resolve, reject) => {
//     function next(data) {
//       let { value, done } = it.next(data)
//       if (done) {
//         resolve(value)
//       } else {
//         Promise.resolve(value)
//           .then(next,reject)
//       }
//     }
//     next()
//   })
// }
// // const co = require('co')
// co(read()).then((data) => {
//   console.log(data)
// }).catch(err => {
//   console.log(err)
// })
// let it = read()
// let { value, done } = it.next()
// value.then((data) => {
//   let { value, done } = it.next(data)
//   value.then((data) => {
//     let { value, done } = it.next(data)
//     console.log(value, done)
//   })
// }).catch(err => {
//   it.throw(err)
// })
// async await 就是 co + generaotr的语法糖
async function read() {
  let content = await fs.readFile(path.join(__dirname, 'name.txt'), 'utf8')
  let age = await fs.readFile(path.join(__dirname, content), 'utf8')
  return age
}

read().then((data) => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
