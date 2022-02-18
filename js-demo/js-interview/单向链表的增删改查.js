/*
 * @Author: 鲍佳玮
 * @Date: 2022-02-14 13:26:33
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-02-18 11:53:01
 * @Description: 单向链表的增删改查
 */
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0 // 链表总长度
  }
  add(index, element) {
    // 处理只传一个参数(追加内容)
    if (arguments.length === 1) {
      element = index
      index = this.size
      //   console.log(element, this.size)
    }
    // 当索引为0时，向头部添加节点
    // 先保存老头，再创建新的节点，新头指向新节点，新节点的next指向老头
    if (index === 0) {
      const oldHead = this.head
      this.head = new Node(element, oldHead)
    } else {
      // 找出前一个节点，向后插入一个
      // 前面的项的next指向新节点，新节点的next指向原来的节点的next
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }
  _getNode(index) {
    let head = this.head
    while (index-- > 0) {
      head = head.next
    }
    return head
  }
  remove(index) {
    let removeNode
    if (index === 0) {
      removeNode = this.head
      this.head = this.head.next
    } else {
      const prevNode = this._getNode(index - 1)
      removeNode = prevNode.next
      prevNode.next = prevNode.next.next
    }
    this.size--
    return removeNode
  }
  update(index, element) {
    const node = this._getNode(index)
    node.element = element
    return node
  }
  find(index) {
    return this._getNode(index)
  }
  reverse() {
    function _reverse(head) {
      if (head == null || head.next == null) return head
      let newHead = _reverse(head.next)
      head.next.next = head
      head.next = null
      return newHead
    }

    return _reverse(this.head)
  }
  reverse1() {
    let head = this.head
    if (head == null || head.next == null) return head
    let newHead = null
    while (head) {
      let n = head.next
      head.next = newHead
      newHead = head
      head = n
      console.log(newHead)
    }
    return newHead
  }
}

let ll = new LinkedList()
ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
// ll.update(2, 100)
// console.log(ll.remove(3))
console.dir(ll.reverse1(), { depth: 100 })
