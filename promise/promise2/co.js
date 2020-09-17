// 类数组 长的像数组
// generator 生成器 =》 遍历器 =》 数组 =》 类数组能否遍历
// const likeArray = {0:'a',1:'b',2:'c',3: 'd',length: 4}
// 给对象增加一个遍历器接口,必须返回一个对象包含next方法
// next方法返回的对象里，当done为true，就停止遍历
/**
 *  { value: 'a', done: false }
    { value: 'b', done: false }
    { value: 'c', done: false }
    { value: 'd', done: false }
    { value: undefined, done: true }
    打印: [ 'a', 'b', 'c', 'd' ]
 */
likeArray[Symbol.iterator] = function (params) {
  let i = 0
  return {
    next:() => {
      return {value: this[i], done: i++ === this.length}
    }
  }
}
// 元编程，自己改写js的原有的功能
likeArray[Symbol.iterator] = function *() {
  let i = 0
  while(i !== this.length) { // generator固定语法 yield必须要和*配合使用
    yield this[i++]
  }
}

// 原理就是遍历这个对象，将结果放到数组中，这个数据必须有个遍历器
console.log('打印:', [...likeArray])
// console.log(Array.from(likeArray))

// 普通函数默认会从头到尾执行，没有暂停的功能
// generator函数是es6提供的语法，如果碰到yield就会暂停执行(redux-saga, koa1)
function *read() {
  yield 1
  yield 2
  yield 3
}
let it = read() // it就是迭代器，迭代器上有next方法
console.dir(it.next()) // { value: 1, done: false }
console.dir(it.next()) // { value: 2, done: false }
console.dir(it.next()) // { value: 3, done: false }
console.dir(it.next()) // { value: undefined, done: true }
console.dir(it.next()) // { value: undefined, done: true }

let flag = false
do {
  let {value, done} = it.next()
  console.log(value)
  flag = done
} while (!flag);

function *read() {
  let a = yield 1
  console.log(a)
  let b = yield 2
  console.log(b)
  let c = yield 3
  console.log(c)
  return c
}

// // 蛇形执行，除了第一次之外的next方法，都是把next中的参数传递给上一次yield的返回结果
let it = read()
console.log(it.next())  // 第一次的next传递参数没有意义，因为第一次之前并没有yield，返回{ value: 1, done: false }
console.log(it.next(2)) // 这次打印a，并且走到yield 2, 返回{ value: 2, done: false }停止
console.log(it.next(3)) // 这次打印b，并且走到yield 3, 返回{ value: 3, done: false }停止
console.log(it.next(4)) // 这次打印4，返回{ value: 4, done: true }结束

const fs = require('fs').promises
function *read() {
// 支持trycatch
  try {
    let name = yield fs.readFile('name.txt', 'utf8')
    console.log('存在name.txt中的值', name)
    let age = yield fs.readFile(name, 'utf8')
    return age
  } catch (error) {
    console.log(error)
  }
}
let it = read()
let { value, done } = it.next()
value.then(data => {
  let {value, done } = it.next(data)
  value.then(data => {
    let {value, done } = it.next(data)
    console.log('存在age.txt中的值', value)
    // it.throw('error')
  })
})

const co = (it) => {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data)
      if(done) {
        resolve(value)
      } else {
        Promise.resolve(value).then(next, reject)
      }
    }
    next()
  })
}

co(read()).then(data => {
  console.log(data)
})

// [1,2,3,[4,5,6,[7,8]]]
const flatten = (arr) => {
  return arr.reduce((memo, item) => {
    return memo.concat(Array.isArray(item) ? flatten(item): item)
  }, [])
}

const createFlow = (affects) => {
  affects = flatten(affects.slice())
  const isPromise = (func) => {
    return func && typeof func.then === 'function'
  }
  function run(callback) {
    while(affects.length){
      const item = affects.shift()
      if(typeof item === 'function') {
        const res = item()
        if(isPromise(res)){
          res.then(() => {
            createFlow(affects).run(callback)
          })
          return
        } 
      } else if(item.isCreateFlow){
        item.run(() => {
          createFlow(affects).run(callback)
        })
        return 
      }
    }
   callback && callback()
  }
  return {
    run,
    isCreateFlow: true
  }
}
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
createFlow([
  () => console.log("a"),
  () => console.log("b"),
  createFlow([() => delay(1000).then(() => console.log("c"))]),
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log('done')
});
// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打