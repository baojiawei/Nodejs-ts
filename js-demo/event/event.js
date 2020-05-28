// 通用的事件绑定函数
// function bindEvent(elem, type, fn) {
//   elem.addEventListener(type, fn)
// }
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通
      fn.call(target, event)
    }
  })
}

const btn1 = document.getElementById('btn1')

// 普通绑定
bindEvent(btn1, 'click', function (event) {
  // console.log(event.target)
  event.preventDefault() // 阻止默认事件，比方a标签 
  alert(this.innerHTML)
})

// 事件代理
// 代码简洁，减少浏览器内存使用，但是不要滥用
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', 'a', function (event) {
  event.preventDefault()
  // const target = event.target
  // if (target.nodeName === 'A') {
  //   alert(target.innerHTML)
  // }
  alert(this.innerHTML)
})

// const p1 = document.getElementById('p1')
// bindEvent(p1, 'click', event => {
//   event.stopPropagation() // 阻止冒泡
//   console.log('激活')
// })

// const body = document.body
// bindEvent(body, 'click', event => {
//   console.log('取消')
//   // console.log(event.target)
// })

// const div2 = document.getElementById('div2')
// bindEvent(div2, 'click', event => {
//   console.log('div2 clicked')
//   console.log(event.target)
// })

// 描述事件冒泡的流程
// 基于DOM树形结构
// 事件会顺着触发元素往上冒泡
// 应用场景：事件代理