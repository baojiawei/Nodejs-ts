/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-10 09:10:25
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-03-02 09:48:44
 * @Description: 实现数字千分位逗号分隔
 */
function thousands(num = 0) {
  let result = []
  let counter = 0
  num = num.toString().split('')
  for (let i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (counter % 3 === 0 && i !== 0) {
      result.unshift(',')
    }
  }
  console.log(result.join(''))
}

function thousands(num = 0) {
  let result = []
  let counter = 0
  num = num.toString().split('')
  for (let i = 0; i < num.length; i++) {
    counter++
    result.push(num[i])
    if (counter % 3 === 0 && i <= num.length) {
      result.push(',')
    }
  }
  result.pop()
  console.log(result.join(''))
}

thousands(314159265354)
