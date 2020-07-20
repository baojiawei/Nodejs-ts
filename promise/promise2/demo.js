console.log(1)
async function async() {
  console.log(2)
  await console.log(3)
  console.log(4)
}
setTimeout(() => {
  console.log(5)
}, 0);
const promise = new Promise((resolve, reject) => {
  console.log(6)
  resolve(7)
})
promise.then(res => {
  console.log(res)
})
async()
console.log(8)


Promise.resolve().then(() => {
  console.log(1)
  Promise.resolve().then(() => {
    console.log(11)
  }).then(() => { 
    console.log(22)
  }).then(() => {
    console.log(33)
  }).then(()=>{
    console.log(44)
  })
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

async function async1() {
  console.log('async1 start')
  await async2()
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0);
async1()
new Promise(function (resolve){
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('script end')
})
