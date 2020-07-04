/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 仿照微信时间
 * @param {}} time
 */
function toWeiXinString(time) {
  const timer = new Date(time)
  const now = new Date()
  let str
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  const beforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
  const monday = new Date(today)
  monday.setDate(today.getDate() - (today.getDay() ? today.getDay() - 1 : 6))
  if (timer.getTime() > today.getTime()) {
    str = ''
  } else if (timer.getTime() > yesterday.getTime()) {
    str = '昨天' + ' '
  } else if (timer.getTime() > beforeYesterday.getTime()) {
    str = '前天' + ' '
  } else if (timer.getTime() > monday.getTime()) {
    const week = { '0': '周日', '1': '周一', '2': '周二', '3': '周三', '4': '周四', '5': '周五', '6': '周六' }
    str = week[timer.getDay() + ''] + ' '
  } else {
    const hour = ['凌晨', '早上', '下午', '晚上']
    const h = timer.getHours()
    if (h === 12) str = '中午'
    else str = hour[parseInt(h / 6)]
    str = parseTime(time, '{m}月{d}日') + ' ' + str
  }
  str += parseTime(time, '{h}:{i}')
  return str
}

const Date1 = new Date('2020/06/15 14:20:22').getTime()
const Date2 = new Date('2020/06/16 09:20:22').getTime()
const Date3 = new Date('2020/06/17 09:20:22').getTime()
const Date4 = new Date('2020/06/18 09:20:22').getTime()
const Date5 = new Date('2020/06/19 12:20:22').getTime()
const Date6 = new Date('2020/06/20 00:00:00').getTime()
const Date7 = new Date('2020/06/21 01:20:22').getTime()
const Date8 = new Date('2020/06/22 09:20:22').getTime()
const Date9 = new Date('2020/06/23 23:20:22').getTime()
const Date10 = new Date('2020/06/24 22:20:22').getTime()
const Date11 = new Date('2020/06/25 21:20:22').getTime()
const Date12 = new Date('2020/06/26 13:20:22').getTime()
const Date13 = new Date('2020/06/27 08:20:22').getTime()
const Date14 = new Date('2020/06/28 06:20:22').getTime()
console.log(toWeiXinString(Date1))
console.log(toWeiXinString(Date2))
console.log(toWeiXinString(Date3))
console.log(toWeiXinString(Date4))
console.log(toWeiXinString(Date5))
console.log(toWeiXinString(Date6))
console.log(toWeiXinString(Date7))
console.log(toWeiXinString(Date8))
console.log(toWeiXinString(Date9))
console.log(toWeiXinString(Date10))
console.log(toWeiXinString(Date11))
console.log(toWeiXinString(Date12))
console.log(toWeiXinString(Date13))
console.log(toWeiXinString(Date14))