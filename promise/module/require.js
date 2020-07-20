// 1.默认调用require语法
// 2.Module.prototype.require模块的原型上有require方法
// 3.Module._load调用模块的加载方法，最终返回的是module.exports
// 4.Module._resolveFilename 解析文件名 将文件名变成绝对路径 默认尝试加载.js/.json/.node
// 5.Module._cache 默认会判断是否存在缓存
// 6.new Module 创建模块(对象) id, exports
// 7.把模块缓存起来，方便下次使用
// ______________根据文件名(绝对路径)创建一个模块
// 8.tryModuleLoad 尝试加载模块 module.load
// 9.module.paths 第三方模块查找路径
// 10.获取当前模块的扩展名 根据扩展名调用对应的方法 Module._extensions 策略模式
// 11.获取文件的内容
// 12.调用module._compile方法
// 13.将用户的内容包裹到一个函数中(function (exports, require, module, __filename, __dirname){})
// 最终返回的是module.exports 用户会给这个module.exports进行赋值
const path = require('path')
const fs = require('fs')
const vm = require('vm')
function Module() {

}
Module._resolveFilename = function(filepath) {
  let _filepath = path.resolve(__dirname, filepath)
  console.log(_filepath)
}
Module._load = function(filepath) {
  let absPath = Module._resolveFilename(filepath)
}
function myRequire(filepath) {
  return Module._load(filepath)
}
let r = myRequire('./a')