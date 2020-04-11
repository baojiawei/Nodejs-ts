const getList = (author, keyword) => {
}

const getDetail = (id) => {
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content属性
  return {
    id: 3 //表示新建博客，插入到数据表里的id
  }
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