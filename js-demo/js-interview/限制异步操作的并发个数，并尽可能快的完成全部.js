/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-14 17:23:36
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-28 17:18:55
 * @Description: 使用Promise实现：限制异步操作的并发个数，并尽可能快的完成全部
 */
// var urls = [
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png'
// ]
// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = function () {
//       console.log('一张图片加载完成')
//       resolve(img)
//     }
//     img.onerror = function () {
//       reject(new Error('Could not load image at' + url))
//     }
//     img.src = url
//   })
// }
let request = function (id) {
  return new Promise((resolve, reject) => {
    //随机一个执行时间
    let time = Math.floor(10000 * Math.random())
    console.log(`id为${id}开始请求,预计执行时间${time / 1000}`)
    setTimeout(() => {
      resolve(id)
    }, time)
  }).then(id => {
    console.log(`id为${id}的请求进行逻辑处理`)
    return id
  })
}
let idArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function loadAllImgs(limit, handler, urls) {
  let sequence = [].concat(urls)
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => index)
  })
  return sequence
    .reduce((p, url) => {
      return p
        .then(() => {
          return Promise.race(promises)
        })
        .then(fastestIndex => {
          console.log(`id为${fastestIndex}的请求进行处理完毕`)
          promises[fastestIndex] = handler(url).then(() => fastestIndex)
        })
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises)
    })
}

// idHandler(3, request, idArray).then(res => {
//   console.log('所有请求结束')
//   console.log(res)
// })
