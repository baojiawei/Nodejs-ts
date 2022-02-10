const input1 = document.getElementById('input1')
let timer
// input1.addEventListener('keyup', function () {
//   if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(() => {
//     console.log(input1.value)
//     timer = null
//   }, 500)
// })

function debounce(fn, delay = 300) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

input1.addEventListener(
  'keyup',
  debounce(() => {
    console.log(input1.value)
  })
)

function throttle(fn, delay = 3000) {
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, delay)
  }
}
input1.addEventListener(
  'keyup',
  throttle(() => {
    console.log(input1.value)
  })
)
