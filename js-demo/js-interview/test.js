/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-18 09:19:10
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-03-01 18:01:51
 * @Description: 现在提供10个id和请求函数（请求返回promise对象），现在要求你设置一个并发数（假设为3），达到并发设置效果。
 */
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }
  off(type, callback) {
    if (!this.events[type]) {
      console.log(`类型${type}的事件并未注册`)
      return
    }
    this.events[type] = this.events[type].filter(item => item !== callback)
  }
  once(type, callback) {
    function fn() {
      callback()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest))
  }
}

// 使用如下
const event = new EventEmitter()

const handle = (...rest) => {
  console.log(rest)
}

event.on('click', handle)

event.emit('click', 1, 2, 3, 4)

event.off('click', handle)

event.emit('click', 1, 2)

event.once('dbClick', () => {
  console.log(123456)
})
event.emit('dbClick')
event.emit('dbClick')
