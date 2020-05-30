/**
 * 手写trim保证浏览器兼容性
 */
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}

const trimTestString = '   bjw   '
console.log(trimTestString.trim())

/**
 * 获取多个数字中的最大值
 */
function max() {
  const nums = Array.prototype.slice.call(arguments)
  let max = 0
  nums.forEach((item) => {
    if (item > max) {
      max = item
    }
  })
  return max
}

console.log(max(10, 60, 30, 40))

console.log(Math.max(10, 20, 30, 40))
