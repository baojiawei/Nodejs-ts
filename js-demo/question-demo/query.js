/**
 * 获取页面url参数
 * @param {查询的参数名} name
 */
function queryString(name) {
  const search = location.search.substr(1)
  let params = search.split('&')
  let result = ''
  params.forEach((item) => {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    if (name === key) {
      result = value
    }
  })
  return result
}

/**
 * 获取页面url参数(正则表达式)
 * @param {查询的参数名} name
 */
function queryStringByRegRex(name) {
  const search = location.search.slice(1)
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const res = search.match(reg)
  if (res == null) {
    return null
  }
  return res[2]
}

/**
 * 获取页面url参数(URLSearchParams)
 * @param {查询的参数名} name
 */
function queryByAPI(name) {
  const search = location.search.slice(1)
  const p = new URLSearchParams(search)
  return p.get(name)
}
// console.log(queryString('a'))
// console.log(queryStringByRegRex('a'))
console.log(queryByAPI('b'))
