/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-10 08:24:10
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-10 09:06:10
 * @Description: 使用Promise实现每隔1秒输出1,2,3
 */

const arr = [1, 2, 3]
arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log(x))
      }, 1000)
    })
  })
}, Promise.resolve())

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000)
  })
}
async function count() {
  for (let i = 1; i < 4; i++) {
    console.log(i)
    await sleep(1)
  }
}

count()
