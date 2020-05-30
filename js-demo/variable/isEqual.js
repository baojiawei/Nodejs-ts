/**
 * 判断是否是一个对象或者数组
 * @param {*} obj
 */
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
  // 如果传入的参数不是对象，直接比较
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 如果传入的参数本身就相等，直接返回true
  if (obj1 === obj2) {
    return true
  }
  // 传入的参数是对象或者数组
  // 先判断key长度是否一致，不一致，直接返回false
  const obj1KeysLength = Object.keys(obj1).length
  const obj2KeysLength = Object.keys(obj2).length
  if (obj1KeysLength !== obj2KeysLength) {
    return false
  }
  // 长度相等，则进行递归比较, 以obj1为基准
  for (let key in obj1) {
    const result = isEqual(obj1[key], obj2[key])
    if (!result) {
      return false
    }
  }
  return true
}

const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
  c: 200,
}
const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
  c: 500,
}
console.log(isEqual(obj1, obj2))
