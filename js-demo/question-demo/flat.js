const arr = [1, 2, [3, 4, [5, 6], 7, 9], 10]
/**
 * 数组拍平
 * @param {嵌套数组} arr
 */
function flat(arr) {
  const isDeep = arr.some((item) => item instanceof Array)
  if (!isDeep) {
    return arr
  }
  const result = Array.prototype.concat.apply([], arr)
  return flat(result)
}

console.log(flat(arr))
