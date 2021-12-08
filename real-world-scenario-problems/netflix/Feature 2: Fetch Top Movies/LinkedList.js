export let LinkedListNode = function(data){
	this.data = data
  this.next = null
}


export let insertAtHead = function(head, data) {
  let newNode = new LinkedListNode(data)
  newNode.next = head
  return newNode
}

export let insertAtTail = function(head, node) {
  if (!head) {
    return node
  }

  let temp = head

  while (temp.next) {
    temp = temp.next
  }

  temp.next = node
  return head
}

export let createRandomLinked_list = function(length) {
  let listHead = null
  for (let i = 0; i < length; i++) {
    listHead = insertAtHead(listHead, Math.floor(Math.random() * 100 + 1))
  }
  return listHead
}
export let createLinkedList = function(lst) {
  let listHead = null
  lst.reverse()
  for (let x = 0; x < lst.length; x++) {
    listHead = insertAtHead(listHead, lst[x])
  }
  return listHead
}

export let display = function(head) {
  let temp = head
  let s = ""
  while (temp) {
    s += temp.data
    temp = temp.next
    if (temp) {
      s += ", "
    }
  }
  return s
}

export let toList = function(head) {
  let lst = []
  let temp = head
  while (temp) {
    lst.push(temp.data)
    temp = temp.next
  }
  return lst
}

export let isEqual = function(list1, list2) {
  if (list1 === list2) {
    return true
  }

  while (list1 && list2) {
    if (list1.data != list2.data) {
      return false
    }
    list1 = list1.next
    list2 = list2.next
  }
  return (list1 === list2)
}

export let get_length = function(head) {
  let list_length = 0
  while (head) {
      head = head.next
      list_length++
  }

  return list_length
};