const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1546610524373,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1546610491112,
    author: 'zhangsan'
  }
}

module.exports = {
  getList,
  getDetail
}