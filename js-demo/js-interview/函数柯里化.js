/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-10 09:45:44
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-10 10:37:45
 * @Description: 函数柯里化
 */

function sum(...args) {
  return args.reduce((sum, arg) => sum + arg)
}

function curry(fn) {
  let temp = []
  return function _c(...args) {
    if (args.length > 0) {
      temp = [...temp, ...args]
      return _c
    } else {
      return fn.apply(this, temp)
    }
  }
}

const add = curry(sum)

console.log(add(1)(2)(3)(4)())
console.log(add(1)(1, 2, 3)(2)())
