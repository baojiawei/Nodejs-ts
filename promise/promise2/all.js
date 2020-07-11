// Promise.all 解决并发问题 多个异步并发获取最终结果
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    const valuesLength = values.length
    let resultArr = []
    let resultIndex = 0
    const processResultByKey = (value, index) => {
      resultArr[index] = value
      if(++resultIndex === valuesLength) {
        resolve(resultArr)
      }
    }
    for (let i = 0; i < valuesLength; i++) {
      let value = values[i]
      if (value && typeof value.then === 'function') {
        value.then(res => {
          processResultByKey(res, i)
        },reject)
      } else {
        processResultByKey(value, i)
      }
    }
  })
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err')
  }, 1000)
})
Promise.all([1, 2, 3, 4, p1, p2, 5, 6])
  .then((data) => {
    console.log('resolve', data)
  })
  .catch((err) => {
    console.log('reject', err)
  })
