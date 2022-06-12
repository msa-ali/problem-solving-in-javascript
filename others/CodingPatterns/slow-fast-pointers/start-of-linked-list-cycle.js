/*
    If we know the length of the LinkedList cycle, we can find the start of the cycle through the following steps:
    Take two pointers. Let’s call them pointer1 and pointer2.
    Initialize both pointers to point to the start of the LinkedList.
    We can find the length of the LinkedList cycle. 
    Let’s assume that the length of the cycle is ‘K’ nodes.
    Move pointer2 ahead by ‘K’ nodes.
    Now, keep incrementing pointer1 and pointer2 until they both meet.
    As pointer2 is ‘K’ nodes ahead of pointer1, which means, pointer2 must have completed one loop in the cycle when both pointers meet. 
    Their meeting point will be the start of the cycle.
*/

class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  function find_cycle_start(head) {
    cycle_length = 0;
    // find the LinkedList cycle
    let slow = head,
      fast = head;
    while ((fast !== null && fast.next !== null)) {
      fast = fast.next.next;
      slow = slow.next;
      if (slow === fast) { // found the cycle
        cycle_length = calculate_cycle_length(slow);
        break;
      }
    }
    return find_start(head, cycle_length);
  }
  
  
  function calculate_cycle_length(slow) {
    let current = slow,
      cycle_length = 0;
    while (true) {
      current = current.next;
      cycle_length += 1;
      if (current === slow) {
        break;
      }
    }
    return cycle_length;
  }
  
  
  function find_start(head, cycle_length) {
    let pointer1 = head,
      pointer2 = head;
    // move pointer2 ahead 'cycle_length' nodes
    while (cycle_length > 0) {
      pointer2 = pointer2.next;
      cycle_length -= 1;
    }
    // increment both pointers until they meet at the start of the cycle
    while (pointer1 !== pointer2) {
      pointer1 = pointer1.next;
      pointer2 = pointer2.next;
    }
  
    return pointer1;
  }
  
  const head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(5);
  head.next.next.next.next.next = new Node(6);
  
  head.next.next.next.next.next.next = head.next.next;
  console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);
  
  head.next.next.next.next.next.next = head.next.next.next;
  console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);
  
  head.next.next.next.next.next.next = head;
  console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);