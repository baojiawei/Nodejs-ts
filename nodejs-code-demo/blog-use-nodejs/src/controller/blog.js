const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `
    select id, title, content, createtime, author
    from blogs
    where 1=1
  `
  if(author) {
    sql += `and author = '${author}'`
  }
  if(keyword) {
    sql += `and title like '%${keyword}%'`
  }

  sql += `order by createtime desc`

  return exec(sql)

}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = + new Date()
  const sql = `
    insert into blogs(title, content, createtime, author)
    values('${title}', '${content}', ${createtime}, '${author}')
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含title content属性
  return true
}

const delBlog = (id) => {
  // id 就是要更新博客的id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}