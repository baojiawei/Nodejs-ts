/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-16 16:35:32
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-16 17:49:11
 * @Description: 解析url
 */
/**

解析一个url，并生成window.location对象包含的域
location:
{
 href: '包含完整的url',
 protocol: 'url使用的协议，包含末尾的:',
 host: '完整主机名，包含:和端口',
 hostname: '主机名，不包含端口'
 port: '端口号',
 pathname: '服务器上访问资源的路径/开头',
 search: 'query string，?开头',
 hash: '#开头的fragment identifier'
}
@param {string} url 需要解析的url
@return {Object} 包含url信息的对象 
*/
const url = 'https://bo.bcool.com:8080/topic/d9e5d51b-5b8d-4b80-8011-6766a0323bb3?orderBy=updateTime&order=desc&tagId=26#login.html'
function parseUrl(url) {
  var result = {}
  var keys = ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash']
  var i, len
  var regexp = /(^[a-z]+):\/\/(([a-z.]+):(\d+)?)(\/[^?#]*)?\?([^#]*)?#(.*)?/

  var match = regexp.exec(url)
  console.info('match=', match)

  if (match) {
    for (i = keys.length - 1; i >= 0; --i) {
      result[keys[i]] = match[i] ? match[i] : ''
    }
  }
  console.info('result=', result)
  return result
}
parseUrl(url)
