/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-15 11:14:33
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 11:14:59
 * @Description: 字符串的应用
 */
// 判断一个字符串是否是回文字符串
function isPalindrome(str) {
  const reverseStr = str.split('').reverse().join('')
  return str === reverseStr
}

function isPalindrome(str) {
  let i = 0,
    len = str.length
  for (; i < len; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false
    }
  }
  return true
}
console.log(isPalindrome('yedssey'))

// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
// 输入: "aba"
// 输出: True
// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
const validPalindrom = function (s) {
  const len = s.length
  let i = 0,
    j = len - 1
  while (i < j && s[i] === s[j]) {
    i++
    j--
  }
  if (isPalindrome(i + 1, j)) {
    return true
  }
  if (isPalindrome(i, j - 1)) {
    return true
  }
  function isPalindrome(st, ed) {
    while (st < ed) {
      if (s[st] !== s[ed]) {
        return false
      }
      st++
      ed--
    }
    return true
  }
  return false
}
console.log(validPalindrom('yessey'))

// 设计一个支持以下两种操作的数据结构：
// void addWord(word)
// bool search(word)
// search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
// . 可以表示任何一个字母。
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// 说明:
// 你可以假设所有单词都是由小写字母 a-z 组成的。

const WordDictionary = function () {
  this.words = {}
}

WordDictionary.prototype.addWord = function (word) {
  if (!word.length) {
    return
  }
  if (this.words[word.length]) {
    // 如果字符串对应长度的数组已经存在，做添加
    this.words[word.length].push(word)
  } else {
    // 做新增
    this.words[word.length] = [word]
  }
}

WordDictionary.prototype.search = function (word) {
  if (!this.words[word.length]) {
    // 如果仓库中对应长度不存在，直接返回false
    return false
  }
  // 如果word包含点
  if (word.includes('.')) {
    const reg = new RegExp(word)
    return this.words[word.length].some(item => {
      return reg.test(item)
    })
  } else {
    return this.words[word.length].includes(word)
  }
}

const dic = new WordDictionary()
dic.addWord('bad')
dic.addWord('dad')
dic.addWord('mad')
console.log(dic.words)
console.log(dic.search('pad'))
console.log(dic.search('bad'))
console.log(dic.search('.ad'))
console.log(dic.search('b..'))

// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。
// 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
// 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
// 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
// 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
// 在任何情况下，若函数不能进行有效的转换时，请返回 0。
// 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX (2^31 − 1) 或 INT_MIN (−2^31) 。
// 输入: '42'
// 输出: 42
// 输入: " -42"
// 输出: -42
// 解释: 第一个非空白字符为 '-', 它是一个负号。
// 我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
// 输入: "4193 with words"
// 输出: 4193
// 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
// 输入: "words and 987"
// 输出: 0
// 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。 因此无法执行有效的转换。
// 输入: "-91283472332"
// 输出: -2147483648
// 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。因此返回 INT_MIN (−2^31) 。

function atoi(str) {
  let temp = str.trim()
  const reg = new RegExp(/\s*([-\+]?\d*).*/)
  const groups = str.match(reg)
  const max = Math.pow(2, 31) - 1
  const min = -max - 1
  let targetNum = 0
  if (groups) {
    targetNum = +groups[1]
    if (isNaN(targetNum)) {
      targetNum = 0
    }
  }
  if (targetNum > max) {
    return max
  }
  if (targetNum < min) {
    return min
  }
  return targetNum
}
console.log(atoi('91283472332'))
