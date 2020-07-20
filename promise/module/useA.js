// 模块化的实现原理就是通过 函数来隔离作用域（会将module.exports 返回给当前内容）
// 同步引入，非引用类型，值不变，反之，值可能会变
// 调试方式 node --inspect-brk 文件名
let result = require('./a')
console.log(result)