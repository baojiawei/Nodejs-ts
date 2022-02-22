/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-22 16:52:16
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-22 16:59:01
 * @Description: 随机生成一个长度为10的整数类型数组，
 * 例如[2,10,3,4,5,11,10,11,20],将其排列成一个新的数组
 * 要求数组形式如下，例如[[2,3,4,5],[10,11],[20]]
 *
 */
const getRandomIntNumber = max => {
  return [
    ...new Set(
      Array.from({ length: 10 }, () => {
        return Math.floor(Math.random() * max + 1)
      }).sort((a, b) => a - b)
    )
  ]
}

const formArray = () => {
  const arr = getRandomIntNumber(99)
  let obj = {},
    res = []
  arr.forEach(item => {
    const key = Math.floor(item / 10)
    if (!obj[key]) {
      obj[key] = [item]
    } else {
      obj[key] = [...obj[key], item]
    }
  })
  for (let k in obj) {
    res.push(obj[k])
  }
  return res
}

console.log(formArray())
