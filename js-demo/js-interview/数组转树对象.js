/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-28 15:27:08
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-28 15:27:08
 * @Description: 数组转树对象
 */
// 原始 list 如下
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
]

function convert(list) {
  const res = []
  const map = list.reduce((li, item) => {
    li[item.id] = item
    return li
  }, {})
  for (let item of list) {
    const parentId = item.parentId
    if (parentId === 0) {
      res.push(item)
    }
    if (map[parentId]) {
      let parentData = map[parentId]
      if (!parentData['children']) {
        parentData['children'] = []
      }
      parentData['children'].push(item)
    }
  }
  // console.log(map)
  return res
}
const result = convert(list)
console.dir(result, { depth: 1000 })
