/**
 * truely && falsely 变量
 * 除以之外，都是truely变量
 */

!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === false
!!false === false

console.log(10 && 0)
console.log('' || 'abc')
// console.log(!window.abc)

/**
 * 除了 == null之外，其他一律用===
 */
const obj = { x: 100 }
if(obj.a == null) {
  console.log(111)
}
// 相当于
// if(obj.a === null || obj.a === undefined) {}

/**
 * 常见的值类型
 * undefined、symbol、number、string、boolean
 */
let a // undefined
const c = 'abc'
const n = 100
const b = true
const s = Symbol('s')

/**
 * 常见的引用类型
 * 前三个typeof都为object, 函数为function
 */
const obj = { x: 100 }
const arr = ['a', 'b', 'c']
const nu = null // 特殊引用类型，指针指向为空地址
// 特殊引用类型，但不用于存储数据，所以没有拷贝、复制函数一说
function fn(){}