const express = require('./like-express')

// 本次 http 请求的实例
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设在处理cookie
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设处理 post data
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 100
    }
    next()
  });
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api 路由')
  next()
})

// 模拟登陆验证
function loginCheck(req, res, next) {
  console.log('模拟登陆成功')
  setTimeout(() => {
   next() 
  });
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.listen(8000, () => {
  console.log('server is running on port 8000')
})