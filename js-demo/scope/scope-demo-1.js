// 创建10个a标签，点击的时候弹出来对应的序号
for(let i = 0;i< 10;i++) {
  let a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function(e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}

// 自由变量
// 一个变量在当前作用域没有定义，但被使用了
// 向上级作用域，一层一层依次寻找，直到找到了为止
// 如果到全局作用域都没有找到，则报错 xx is not defined

let a = 0
function fn1() {
  let a1 = 100
  function fn2() {
    let a2 = 200
    function fn3() {
      let a3 = 300
      console.log(a + a1 + a2 + a3) 
    }
    fn3()
  }
  fn2()
}
fn1()