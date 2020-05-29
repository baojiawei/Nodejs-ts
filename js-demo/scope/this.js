// 作为普通函数
// 使用call apply bind
// 作为对象方法被调用
// 在class方法中调用
// 箭头函数 箭头函数的this，是在定义时绑定的，不是在执行时绑定的
// this取什么样的值是在函数执行的时候确定的，不是在函数定义的时候确定的
function fn1() {
  console.log(this)
}
fn1() // window

fn1.call({ x: 100 }) // {x:100}
const fn2 = fn1.bind({ x: 200 })
fn2() // {x:200}

const zhangsan = {
  name: '张三',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  wait() {
    setTimeout(function () {
      // this === window
      console.log(this)
    })
  },
  waitAgain() {
    setTimeout(() => {
      // this 即当前对象
      console.log(this)
    })
  }
}

zhangsan.sayHi()
zhangsan.wait()
zhangsan.waitAgain()

class People {
  constructor(name) {
    this.name = name
    this.age = 20
  }
  sayHi() {
    console.log(this)
  }
}
const lisi = new People('李四')
lisi.sayHi()
