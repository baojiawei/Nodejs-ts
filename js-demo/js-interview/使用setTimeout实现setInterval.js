/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 15:47:34
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 15:50:48
 * @Description: 怎么使用 setTimeout 实现 setInterval？
 */
function mySetInterval(fn, timeout) {
  const timer = {
    flag: true
  }
  function interval() {
    if (timer.flag) {
      fn()
    }
    setTimeout(interval, timeout)
  }

  setTimeout(interval, timeout)
  return timer
}

mySetInterval(() => {
  console.log(123)
})
