const Promise = require('./promise')
// finally实现原理
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => value)
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {throw err})
    }
  ) 
}

Promise.resolve(100)
  .finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(300)
      }, 0)
    })
  })
  .then((data) => {
    console.log('success', data)
  })
  .catch((err) => {
    console.log('catch', err)
  })

// all的实现原理
