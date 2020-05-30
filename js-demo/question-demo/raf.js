// 3s把宽度从100px变为640px，即增加540px
// 60帧/s，3s180帧，每次变化3px
const $div1 = $('#div1')
let curWidth = 100
const maxWidth = 640
/**
 * 使用setTimeout执行动画
 */
function animate() {
  curWidth = curWidth + 3
  $div1.css('width', curWidth)
  if (curWidth < maxWidth) {
    setTimeout(animate, 16.7)
  }
}

/**
 * 使用requestAnimationFrame执行动画
 * 时间不用自己控制，浏览器帮你控制帧率
 * 切换tab，浏览器自动会暂停
 */
function raf() {
  curWidth = curWidth + 3
  $div1.css('width', curWidth)
  if (curWidth < maxWidth) {
    window.requestAnimationFrame(animate)
  }
}

// animate()
raf()
