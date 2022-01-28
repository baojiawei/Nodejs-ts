import { isObject } from '../shared/index'
import { mutableHandlers } from './baseHandlers'

/*
 * @Author: 鲍佳玮
 * @Date: 2022-01-28 20:29:13
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-01-28 21:11:36
 * @Description: reactive
 */

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers)
}
const proxyMap = new WeakMap()
function createReactiveObject(target, baseHandlers) {
  //不是对象不做代理
  if (!isObject(target)) {
    return target
  }
  const exisitingProxy = proxyMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }
  const proxy = new Proxy(target, baseHandlers)
  // 做缓存，将代理过的对象和代理后的结果做一个映射表
  proxyMap.set(target, proxy)
  return proxy
}
