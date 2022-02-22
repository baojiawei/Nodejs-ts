/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 15:30:16
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-22 13:41:51
 * @Description: 封装一个 javascript 的类型判断函数
 */
function getType(value) {
  if (value === null) {
    return value + ''
  }
  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value)
    const groups = valueClass.match(/(?<=\[object )(.+)\]/)
    console.log(groups)
    return groups[1]
  } else {
    return typeof value
  }
}
console.log(getType(function a() {}))
console.log(getType([1]))
