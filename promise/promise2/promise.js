const PENDING = 'PENDING' // 等待
const RESOLVED = 'RESOLVED' // 成功
const REJECTED = 'REJECTED' // 失败

function resolvePromise(promise2, x, resolve, reject) {

}

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
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        let x = onfulfilled(this.value)
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.status === REJECTED) {
        let x = onrejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          let x =  onfulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onRejectedCallbacks.push(() => {
          let x =  onrejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
  }
}