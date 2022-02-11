/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-11 18:29:44
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-11 22:19:17
 * @Description: 实现函数使得将str字符串中的{}内的变量替换，如果属性不存在保持原样（比如{a.d}）
 */
var a = {
  b: 123,
  c: '456',
  e: '789'
}
var str = `a{a.b}aa{a.c}aa {a.d}{a.e}aaaa`
// => 'a123aa456aa {a.d}aaaa'
var str1 = str.replace(/(?<=\{)(.+?)(?=\})/g, match => {
  let tempArr = match.split('.')
  for (let key in a) {
    if (tempArr[1] === key) {
      match = a[key]
    }
  }
  return match
})
console.log(str1)

let num = '-12345535999223.323123'
let result = num.replace(/\B(?=(\d{3})+(?!\d))/g, match => {
  console.log(match)
  return ','
})
console.log(result)
// 12,345

const str2 = 'happy happily'
const reg = /happ(?=ily)/g
console.log(str2.replace(reg, '11'))
