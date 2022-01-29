/*
 * @Author: 鲍佳玮
 * @Date: 2022-01-29 23:38:37
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-01-29 23:56:32
 * @Description: bind方法
 */
Function.prototype.bind = function () {
  const self = this
  const context = [].shift.call(arguments)
  const args = [].slice.call(arguments)
  return function fn() {
    self.apply(context, [].concat(...args, [].slice.call(arguments)))
  }
}
/**
 * @Author: 鲍佳玮
 * @Date: 2022-01-29 23:55:44
 * @LastEditors: 鲍佳玮
 * @Description: 函数柯里化
 * @param {*} obj
 * @return {*}
 */
Function.prototype.bind = function (obj) {
  const self = this
  const args = [].slice.call(arguments, 1)
  return function fn() {
    self.apply(obj, [].concat(...args, [].slice.call(arguments)))
  }
}

const obj = {
  name: 'bjw'
}
const name = 'zlq'
function getName() {
  console.log(this.name)
}

const newGetName = getName.bind(obj, 1, 2)
newGetName()
