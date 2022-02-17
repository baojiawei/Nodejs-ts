/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-17 13:46:24
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-17 13:54:27
 * @Description: eventBus
 */
class EventEmitter {
  constructor() {
    this.handler = {}
  }
  on(eventName, cb) {
    if (!this.handler[eventName]) {
      this.handler[eventName] = []
    }
    this.handler[eventName].push(cb)
  }
  emit(eventName, ...args) {
    if (this.handler[eventName]) {
      const handlers = this.handler[eventName].slice()
      handlers.forEach(cb => {
        cb(...args)
      })
    }
  }
  off(eventName, cb) {
    const callbacks = this.handler[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }
  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

const bus = new EventEmitter()
bus.on('update', params => {
  console.log('执行update', params)
})

bus.emit('update', { a: 1, b: 1 })
