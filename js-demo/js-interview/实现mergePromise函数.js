/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 14:01:56
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 14:13:16
 * @Description: 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
 */
const time = timer => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1)
    return 1
  })
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2)
    return 2
  })
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3)
    return 3
  })

function mergePromise(arr) {
  // 在这里写代码
  return new Promise((resolve, reject) => {
    let tempArr = []
    let idx = 0
    function resolveResult(data, index) {
      tempArr[index] = data
      if (++idx === arr.length) {
        resolve(tempArr)
      }
    }
    arr.forEach((element, index) => {
      Promise.resolve(element()).then(res => {
        resolveResult(res, index)
      })
    })
  })
}
mergePromise([ajax2, ajax1, ajax3]).then(data => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
