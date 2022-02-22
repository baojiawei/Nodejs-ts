/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-22 15:55:49
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-22 15:58:14
 * @Description: 设计LazyMan类
 */
class LazyManClass {
  constructor(name) {
    this.name = name
    this.callbacks = []
    console.log(`Hi I am ${this.name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }
  sleep(time) {
    this.callbacks.push(() => {
      new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`)
          this.next()
          resolve()
        }, time * 1000)
      })
    })
    return this
  }
  eat(foodName) {
    this.callbacks.push(() => {
      console.log(`I am eating ${foodName}`)
      this.next()
    })
    return this
  }
  sleepFirst(time) {
    this.callbacks.unshift(() => {
      new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`)
          this.next()
          resolve()
        }, time * 1000)
      })
    })
    return this
  }
  next() {
    const fn = this.callbacks.shift()
    fn && fn()
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}
// LazyMan('Tony')
// Hi I am Tony
// LazyMan('Tony').sleep(10).eat('lunch')
// Hi I am Tony
// 等待了10秒
// I am eating lunch
LazyMan('Tony').eat('lunch').sleep(10).eat('dinner')
// Hi I am Tony
// I am eating dinner
// 等待了10秒
// I am eating dinner
// LazyMan('Tony').sleep(2).eat('apple').sleep(4).sleepFirst(5).eat('watermelon')
