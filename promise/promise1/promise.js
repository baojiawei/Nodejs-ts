const PENDING = 'PENDING' // 等待
const RESOLVED = 'RESOLVED' // 成功
const REJECTED = 'REJECTED' // 失败

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === PENDING) { //防止resovle之后再调用reject
        this.value = value
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) { //防止reject之后再调用resovle
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error) // 如果执行时发生错误，等价于调用失败方式
    }
  }
  then(onfulfilled, onrejected) {
    if(this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    if(this.status === REJECTED){
      onrejected(this.reason)
    }
    if(this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onfulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason)
      })
    }
  }
}

// 1） 里面有三个状态 等待态（默认）成功态 失败态 一旦成功了就不能失败，反过来也一样
// resolve 代表的是成功 reject 代表的是失败
// 2） 每个promise实例中都有一个then方法
// 3） 如果new Promise的时候 报错了 会变成失败态（抛错也算失败）
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000);
})

promise.then(data => {
  console.log(`data: ${data}`)
}, err => {
  console.log(`err: ${err}`)
})

promise.then(data => {
  console.log(`data: ${data}`)
}, err => {
  console.log(`err: ${err}`)
})

promise.then(data => {
  console.log(`data: ${data}`)
}, err => {
  console.log(`err: ${err}`)
})