/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 14:21:15
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 15:26:48
 * @Description: 查找一篇英文文章中出现频率最高的单词
 */
const str =
  'There are moments in life when you miss someone so much that you just want to pick them from your dreams and hug them for real! Dream what you want to dream;go where you want to go;be what you want to be,because you have only one life and one chance to do all the things you want to do.May you have enough happiness to make you sweet,enough trials to make you strong,enough sorrow to keep you human,enough hope to make you happy? Always put yourself in others’shoes.If you feel that it hurts you,it probably hurts the other person, too.'

function findMostWord(article) {
  // 去除两把空格并全部转为小写
  article = article.trim().toLowerCase()
  // 找出所有单词组成的数组
  let groups = article.match(/[a-z]+/g)
  // 拼接成字符串，转成每个单词的数组
  let final = groups.join('').split('')
  let maxWord = '',
    maxNum = 0,
    maxTempObj = {}
  final.forEach(element => {
    if (!maxTempObj[element]) {
      maxTempObj[element] = 1
    } else {
      maxTempObj[element]++
    }
  })
  //   console.log(Object.entries(maxTempObj))
  Object.entries(maxTempObj).forEach(([key, value]) => {
    if (value > maxNum) {
      maxNum = value
      maxWord = key
    }
  })
  return {
    maxNum,
    maxWord
  }
}
console.log(findMostWord(str))
