/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-20 11:23:11
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-21 16:32:53
 * @Description: 找不同
 */
// 给定两个字符串 s 和 t，它们只包含小写字母。
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
// 请找出在 t 中被添加的字母。

// 示例 1：

// 输入：s = "abcd", t = "abcde"
// 输出："e"
// 解释：'e' 是那个被添加的字母。

// 示例 2：

// 输入：s = "", t = "y"
// 输出："y"

// 示例 3：

// 输入：s = "a", t = "aa"
// 输出："a"

// 示例 4：

// 输入：s = "ae", t = "aea"
// 输出："a"

const s = 'abcd'
const t = 'abcde'
var findTheDifference = function (s, t) {
  // 参数处理
  s = s.split('').sort()
  t = t.split('').sort()
  return t.filter((item, index) => {
    return item !== s[index]
  })[0]
}

// 将字符串 s 中每个字符的 ASCII 码的值求和，得到 As；对字符串 t 同样的方法得到 At。两者的差值At-As即代表了被添加的字符。

var findTheDifference = function (s, t) {
  let as = 0,
    at = 0
  for (let i = 0; i < s.length; i++) {
    as += s[i].charCodeAt()
  }
  for (let i = 0; i < t.length; i++) {
    at += t[i].charCodeAt()
  }
  return String.fromCharCode(at - as)
}
console.log(findTheDifference(s, t))
