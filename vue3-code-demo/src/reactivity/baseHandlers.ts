import { hasChanged, hasOwn, isArray, isInteger, isObject, isSymbol } from '../shared/index'
import { track, trigger } from './effect'
import { reactive } from './reactive'

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    if (isSymbol(key)) {
      return res
    }
    // 依赖收集
    track(target, key)
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
    const hadKey = isArray(target) && isInteger(key) ? Number(key) < target.length : hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    if (!hadKey) {
      trigger(target, 'add', key, value)
    } else if (hasChanged(value, oldValue)) {
      trigger(target, 'set', key, value, oldValue)
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
