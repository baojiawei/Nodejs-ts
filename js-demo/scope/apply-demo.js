Function.prototype._apply = function(context, args) {
  if(context == null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol]
  return fn
}

const Person = {
  name: 'Tom',
  sayHi(age) {
    console.log(this)
    console.log(`我叫${this.name}我今年${age}`)
  }
}

Person1 = {
  name: 'Tom1'
}

Person.sayHi._apply(Person1, [18])