import { hasChanged, hasOwn, isArray, isInteger, isObject, isSymbol } from '../shared/index'
import { reactive } from './reactive'

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    console.log(res)
    if (isSymbol(key)) {
      return res
    }
    // 依赖收集
    if (isObject(res)) {
      // 取值是对象就代理，懒递归
      return reactive(res)
    }
    return res
  }
}
function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]
    const hadKey = isArray(target) && isInteger(target) ? Number(key) < target.length : hasOwn(target, key)

    const result = Reflect.set(target, key, value, receiver)
    if (!hadKey) {
      console.log('新增属性')
    } else if (hasChanged(value, oldValue)) {
      console.log('修改属性')
    }
    return result
  }
}
const get = createGetter()
const set = createSetter()
export const mutableHandlers = {
  get,
  set
}
