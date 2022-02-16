/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 13:51:05
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 14:17:10
 * @Description: 使用Promise实现红绿灯交替重复亮
 */
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
function sleep(time, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb()
      resolve()
    }, time)
  })
}

const step = function () {
  Promise.resolve()
    .then(() => {
      return sleep(3000, red)
    })
    .then(() => {
      return sleep(2000, green)
    })
    .then(() => {
      return sleep(1000, yellow)
    })
    .then(() => {
      return step()
    })
}
step()
