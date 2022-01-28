/*
 * @Author: 鲍佳玮
 * @Date: 2022-01-28 21:05:13
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-01-28 21:47:30
 * @Description: 工具
 */
export const isObject = val => typeof val === 'object' && val != null
export const isSymbol = val => typeof val === 'symbol'
export const isArray = val => Array.isArray
export const isInteger = key => '' + parseInt(key, 10) === key
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val, key) => hasOwnProperty.call(val, key)
export const hasChanged = (value, oldValue) => value !== oldValue
