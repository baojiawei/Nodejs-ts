/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-09 22:12:54
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 16:29:07
 * @Description: 对象拍平
 */

/*
const obj = {
	a: {
  	b: 1,
		c: 2,
		d: {
			e: 5
		}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
// {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3
//    c: 3
// }
*/
function objectFlat(obj = '') {
  const res = {}
  function flat(item, prevKey = '') {
    Object.entries(item).forEach(([key, value]) => {
      let newKey = ''
      if (Array.isArray(item)) {
        newkey = prevKey ? `${prevKey}[${key}]` : key
      } else {
        newkey = prevKey ? `${prevKey}.${key}` : key
      }
      if (typeof value === 'object') {
        flat(value, newkey)
      } else {
        res[newkey] = value
      }
    })
  }
  flat(obj)
  return res
}

// const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
// console.log(objectFlat(source))

const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}
console.log(objectFlat(obj))
