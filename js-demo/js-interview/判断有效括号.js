/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-25 13:52:59
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-25 14:33:35
 * @Description: 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 有效字符串需满足：
 * 1.左括号必须用相同类型的右括号闭合。
 * 2.左括号必须以正确的顺序闭合。
 */
const s = '({})[][]'

// 使用正则
// const isValid = s => {
//   while (true) {
//     let length = s.length
//     s = s.replace('{}', '').replace('[]', '').replace('()', '')
//     if (length === s.length) {
//       return length === 0
//     }
//   }
// }

// 使用栈

const isValid = s => {
  const map = {
    '{': '}',
    '(': ')',
    '[': ']'
  }
  let stack = []
  let flag = true
  for (let k of s) {
    if (map[k]) {
      stack.push(k)
    } else {
      const item = stack.pop()
      if (!map[item] === k) {
        return false
      }
    }
  }
  return !stack.length
}

console.log(isValid(s))
