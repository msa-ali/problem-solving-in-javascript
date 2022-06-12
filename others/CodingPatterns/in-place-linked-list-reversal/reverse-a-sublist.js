class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  
    print_list() {
      let temp = this;
      while (temp !== null) {
        process.stdout.write(`${temp.value} `);
        temp = temp.next;
      }
      console.log();
    }
  }
  
  
  function reverse_sub_list(head, p, q) {
    if (p === q) {
      return head;
    }
  
    // after skipping 'p-1' nodes, current will point to 'p'th node
    let current = head,
      previous = null;
    let i = 0;
    while (current !== null && i < p - 1) {
      previous = current;
      current = current.next;
      i += 1;
    }
  
    // we are interested in three parts of the LinkedList, the part before index 'p',
    // the part between 'p' and 'q', and the part after index 'q'
    const last_node_of_first_part = previous;
    // after reversing the LinkedList 'current' will become the last node of the sub-list
    const last_node_of_sub_list = current;
    let next = null; // will be used to temporarily store the next node
  
    i = 0;
    // reverse nodes between 'p' and 'q'
    while (current !== null && i < q - p + 1) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      i += 1;
    }
  
    // connect with the first part
    if (last_node_of_first_part !== null) {
      // 'previous' is now the first node of the sub-list
      last_node_of_first_part.next = previous;
      // this means p === 1 i.e., we are changing the first node (head) of the LinkedList
    } else {
      head = previous;
    }
  
    // connect with the last part
    last_node_of_sub_list.next = current;
    return head;
  }
  
  
  const head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(5);
  
  process.stdout.write('Nodes of original LinkedList are: ');
  head.print_list();
  result = reverse_sub_list(head, 2, 4);
  process.stdout.write('Nodes of reversed LinkedList are: ');
  result.print_list();