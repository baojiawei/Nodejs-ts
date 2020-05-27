const imgUrl = "http://www.17j.club/static/image/index/baner-male.png"
const imgUrl_2 = "http://www.17j.club/static/image/index/baner.png"

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error(`图片家在失败 ${src}`))
    }
    img.src = src
  })
}

// loadImg(imgUrl).then(img => {
//   console.log(img.width)
//   return img
// }).then(img => {
//   console.log(img.height)
// }).catch(ex => console.error(ex))

loadImg(imgUrl).then(img => {
  console.log(`宽度:${img.width}`)
  return img
}).then(img => {
  console.log(`高度:${img.height}`)
  return loadImg(imgUrl_2)
}).then(img2 => {
  console.log(`宽度:${img2.width}`)
  return img2
}).then(img2 => {
  console.log(`高度:${img2.height}`)
})