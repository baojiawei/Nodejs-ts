/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-11 16:43:06
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-11 16:55:23
 * @Description: 实现map
 */
Array.prototype.map = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const res = []
  const length = this.length >>> 0
  for (let i = 0; i < length; i++) {
    res[i] = callback.call(thisArg, this[i], i, this)
  }

  return res
}

const arr = [1, 2, 3, 4, 5]
const arr1 = arr.map(item => {
  return item * 2
})
console.log(arr1)
