/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-14 17:23:36
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-14 21:55:53
 * @Description: 使用Promise实现：限制异步操作的并发个数，并尽可能快的完成全部
 */
var urls = [
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png'
]
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      console.log('一张图片加载完成')
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('Could not load image at' + url))
    }
    img.src = url
  })
}

function loadAllImgs(limit, handler, urls) {
  let sequence = [].concat(urls)
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })
  return sequence
    .reduce((p, url) => {
      return p
        .then(() => {
          return Promise.race(promises)
        })
        .then(fastestIndex => {
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex
          })
        })
        .catch(err => {
          console.error(err)
        })
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises)
    })
}

loadAllImgs(3, loadImg, urls).then(res => {
  console.log('所有图片下载成功')
  console.log(res)
})
