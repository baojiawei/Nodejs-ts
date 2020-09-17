const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
const resolvePromise = (promise2,x,resolve,reject) => {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if((typeof x === 'object' && x != null) || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if(typeof then === 'function') { // promise
        then.call(x, y => {
          if(called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        },r => {
          if(called) return
          called = true
          reject(r)
        })
      }else { // {then : 123}
        resolve(x)
      }
    } catch (error) {
      if(called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if(value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if(this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject) // 立即执行
    } catch (error) {
      reject(error)
    }
  }

  then(onFufilled, onRejected){
    onFufilled = typeof onFufilled === 'function'? onFufilled:v => v
    onRejected = typeof onRejected === 'function'? onRejected:err => {throw err}
    let promise2 = new Promise((resolve,reject) => {
      if(this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFufilled(this.value)
            resolvePromise(promise2,x,resolve,reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2,x,resolve,reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      if(this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFufilled(this.value)
              resolvePromise(promise2,x,resolve,reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      }
    })
    return promise2
  }

  catch(errCallback) {
    return this.then(null, errCallback)
  }

  finally(callback) {
    return this.then(value => {
      return Promise.resolve(callback()).then(() => value)
    },reason => {
      return Promise.resolve(callback()).then(() => { throw reason })
    })
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let index = 0 // 计数器
      let result = []
      const isPromise = (item) => {
        return typeof item.then === 'function'
      }
      const processData = (key, item) => {
        result[key] = item
        if(++index === promises.length) {
          resolve(result)
        }
      }
      for(let i=0,length=promises.length;i<length;i++) {
        let item = promises[i]
        if(isPromise(item)) {
          item.then(data => {
            processData(i, data)
          }, reject)
        } else {
          processData(i, item)
        }
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      const isPromise = (item) => {
        return typeof item.then === 'function'
      }
      for(let i=0,length=promises.length;i<length;i++) {
        let item = promises[i]
        if(isPromise(item)) {
          item.then(resolve,reject)
        } else {
          resolve(item)
        }
      }
    })
  }
 }

 Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}


 module.exports = Promise