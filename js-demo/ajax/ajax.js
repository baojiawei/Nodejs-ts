/**
 * xhr.readyState
 * 0-(未初始化)还没调用send()
 * 1-(载入)已调用send()，正在发送请求
 * 2-(载入完成)send()执行完成，已经接收到全部响应内容
 * 3-(交互)正在解析响应内容
 * 4-(完成)响应内容解析完成，可以在客户端调用
 * xhr.status
 * 2xx-表示成功处理请求，如200
 * 3xx-需要重定向，浏览器直接跳转，如301(永久重定向)302(临时重定向)304(资源未改变，浏览器就会用自身缓存的资源)
 * 4xx-客户端请求错误，如404(客户端没有资源,请求地址错误)，403(客户端没有权限)
 * 5xx-服务器端错误
 */
// const xhr = new XMLHttpRequest()
// // 传入get方法，路径，true代表异步
// xhr.open('GET', '/ajax/data.json', true)
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.responseText))
//       alert(xhr.responseText)
//     } else {
//       console.log('其他情况')
//     }
//   }
// }
// xhr.send(null)

// post
// xhr.open('POST', '/login', true)
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.responseText))
//       alert(xhr.responseText)
//     } else {
//       console.log('其他情况')
//     }
//   }
// }
// const postData = {
//   username: 'zhangsan',
//   password: '123'
// }
// xhr.send(JSON.stringify(postData)) 

/**
 * 同源策略
 * ajax请求时，浏览器要求当前网页和server必须同源(安全)
 * 同源意味着协议、域名、端口，三者必须一致
 * 加载图片css js可无视同源策略
 * <script>可绕过跨域限制
 * 服务器可以任意动态拼接数据返回
 * 所以，<script>就可以获得跨域的数据，只要服务端愿意返回
 *
 * CORS-服务器设置http header
 * 第二个参数填写允许跨域的域名称，不建议直接写*
 * response.setHeader("Access-Control-Allow-Origin", "http://localhost:9001");
 * response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
 * response.setHeader("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET,OPTIONS");
 * 接收跨域的cookie
 * response.setHeader("Access-Control-Allow-Credentials", "true");
 */

/**
 * 封装简单版的ajax
 * @param {请求地址} url 
 */
function ajax({ url, type, data, asyncType }) {
  return new Promise((resolve, reject) => {
    if (url == null) {
      return
    }
    type = type || 'GET'
    asyncType = asyncType || true
    data = data || null
    const xhr = new XMLHttpRequest()
    xhr.open(type, url, asyncType)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(
            JSON.parse(xhr.responseText)
          )
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(data)
  })
}
const requestParams = {
  url: '/ajax/data1.json'
}
ajax(requestParams).then(res => {
  console.log(res)
}).catch(e => console.error(e))
