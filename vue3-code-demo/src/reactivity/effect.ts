import { isArray, isInteger } from '../shared/index'

/*
 * @Author: 鲍佳玮
 * @Date: 2022-01-28 20:29:26
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-01-29 01:05:52
 * @Description: effect
 */
export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options) // 创建一个响应式的effect
  if (!options.lazy) {
    effect()
  }
  return effect
}
let activeEffect // 全局变量，用于存储当前的effect，关联每个get的state属性
let uid = 0
const effectStack = [] // 建立一个effect栈，用于处理嵌套effect，但是effect被清空导致后面的属性无法被收集
function createReactiveEffect(fn, options) {
  const effect = function () {
    if (!effectStack.includes(effect)) {
      // 防止递归执行
      try {
        activeEffect = effect
        effectStack.push(activeEffect)
        return fn() // 内部调用用户传入effect的方法
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++
  effect.deps = [] // 用于创建每个effect和state的联系
  effect.options = options
  return effect
}
const targetMap = new WeakMap()
// 将属性和effect关联,此方法在baseHandlers的get里用到，
// 因为执行fn后，会一次调用proxy的get方法。需要在get的时候
// 将目标函数和属性传入
// 由于effect可以多次调用
// 所以关联结构应为{Object:{key: [effect,effect]}}
export function track(target, key) {
  if (activeEffect == null) {
    //如果用户不在effect里取值，直接return
    return
  }
  // start =====处理map空的情况=====
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // end =====处理map空的情况=====
  // 创建每个属性和effect的联系，这个联系是双向的
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target, type, key, value?, oldValue?) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const run = effects => {
    if (effects) effects.forEach(effect => effect())
  }
  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= value) {
        //如果改的长度小于原有数组的长度也应该执行effect
        run(dep)
      }
    })
  } else {
    // 对象处理
    if (key != void 0) {
      run(depsMap.get(key))
    }
    switch (type) {
      case 'add':
        if (isArray(target)) {
          if (isInteger(key)) {
            run(depsMap.get('length'))
          }
        }
        break

      default:
        break
    }
  }
}
