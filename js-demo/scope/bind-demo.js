// 手写bind函数
Function.prototype._bind = function () {
  if(typeof this !== 'function') {
    return
  }
  // 将参数拆解为数组
  let args = Array.prototype.slice.call(arguments)
  //获取this(数组第一项)
  let firstArg = args.shift()
  // push.bind(...) 中的push
  let _self = this
  // 返回一个函数
  return function () {
    return _self.apply(firstArg, args)
  }
}

// test
function push() {
  console.log(...arguments)
  Array.prototype.push.call(this, ...arguments)
}
let arr = [1,2,3]
const myPush = push.bind(arr, 4, 5)
myPush()