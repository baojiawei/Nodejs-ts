/**
 * 数组去重
 * @param {传入的数组} arr
 */
function unique(arr) {
  const res = []
  arr.forEach((item) => {
    if (res.indexOf(item) < 0) {
      res.push(item)
    }
  })
  return res
}
/**
 * 数组去重(set，无序，不能重复)
 * @param {传入的数组} arr
 */
function uniquebySet(arr) {
  const set = new Set(arr)
  return [...set]
}

console.log(unique([30, 10, 20, 30, 10, 20, 40]))
console.log(uniquebySet([30, 10, 20, 30, 10, 20, 40]))
