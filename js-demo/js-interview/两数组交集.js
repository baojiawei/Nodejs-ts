/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-25 14:33:19
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-25 14:33:20
 * @Description: 两数组交集
 */
const nums1 = [1, 2, 3, 2, 2, 1]
const nums2 = [2, 2, 2, 2]

const intersect = (nums1, nums2) => {
  let map = {}
  let res = []
  for (let k of nums1) {
    if (!map[k]) {
      map[k] = 1
    } else {
      map[k]++
    }
  }
  for (let k of nums2) {
    if (map[k] > 0) {
      res.push(k)
      map[k]--
    }
  }
  return res
}

console.log(intersect(nums1, nums2))
