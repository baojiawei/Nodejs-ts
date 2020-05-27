const div1 = document.getElementById('div1')
console.log("div1", div1)

const divList = document.getElementsByTagName('div') // 集合
console.log('divList.length', divList.length)
console.log('divList[0]', divList[0])

const containerList = document.getElementsByClassName('container') // 集合
console.log('containerList.length', containerList.length)
console.log('containerList[1]', containerList[0])


const pList = document.querySelectorAll('p') // 集合
const p1 = pList[0]

// property和attribute都有可能引起DOM重新渲染
// property
// 修改对象属性，不会体现到html结构中
p1.style.width = '100px'
console.log(p1.style.width)
p1.className = 'red'
console.log(p1.className)
console.log(p1.nodeName)
console.log(p1.nodeType)

// attribute
// 修改html属性，会改变html结构
p1.setAttribute('data-name', 'aaa')
console.log(p1.getAttribute('data-name'))
p1.setAttribute('style', 'font-size:50px')
console.log(p1.getAttribute('style'))