// 闭包
// 作用域应用的特殊情况， 有两种表现：
// 函数作为参数被传递
// function create() {
//   const a = 100
//   return function() {
//     console.log(a)
//   }
// }
// const fn = create()
// const a = 200
// fn()

// // 函数作为返回值被返回
// function print(fn) {
//   let a = 200
//   fn()
// }
// const a = 100
// function fn() {
//   console.log(a)
// }

// print(fn)

// 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找
// 不是在执行的地方

const oldPush = Array.prototype.push
function push() {
  console.log('helloworld')
  oldPush.call(this, ...arguments)
}

let arr = [1, 2, 3]
push.call(arr, 4)


