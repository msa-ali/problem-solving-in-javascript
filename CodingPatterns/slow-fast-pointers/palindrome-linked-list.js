/*
    Given the head of a Singly LinkedList, write a method to check if the LinkedList is a palindrome or not.

    Your algorithm should use constant space and the input LinkedList should be in the original form once the algorithm is finished. 
    The algorithm should have O(N) time complexity where ‘N’ is the number of nodes in the LinkedList.
 */

// Solution 1: Recursive Solution - O(n) space - using backtracking
/*
    Recursively go to the end of the linked list 
    backtrack and compare last node with start node
    and increase the starting node
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function(head) {
    const [result] = recursive(head, head);
    return result;
};
var recursive = function(head, startNode) {
   if(!head.next && startNode){
       return [head.val === startNode.val, startNode.next];
   }
    let [partialSol, start] = recursive(head.next, startNode); 
    return partialSol ? 
        start ? [head.val === start.val, start.next]: [true]
        : [false];
}


// Solution 2: O(1) space

/*
We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
Once we have the middle of the LinkedList, we will reverse the second half.
Then, we will compare the first half with the reversed second half to see if the LinkedList represents a palindrome.
Finally, we will reverse the second half of the LinkedList again to revert and bring the LinkedList back to its original form.
 */

class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  
  function is_palindromic_linked_list(head) {
    if (head === null || head.next === null) {
      return true;
    }
  
    // find middle of the LinkedList
    let slow = head,
      fast = head;
    while ((fast !== null && fast.next !== null)) {
      slow = slow.next;
      fast = fast.next.next;
    }
  
    headSecondHalf = reverse(slow); // reverse the second half
    // store the head of reversed part to revert back later
    copyHeadSecondHalf = headSecondHalf;
  
    // compare the first and the second half
    while ((head !== null && headSecondHalf !== null)) {
      if (head.value !== headSecondHalf.value) {
        break; // not a palindrome
      }
  
      head = head.next;
      headSecondHalf = headSecondHalf.next;
    }
    reverse(copyHeadSecondHalf); // revert the reverse of the second half
  
    if (head === null || headSecondHalf === null) { // if both halves match
      return true;
    }
  
    return false;
  }
  
  function reverse(head) {
    let prev = null;
    while (head !== null) {
      next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
  
  const head = new Node(2);
  head.next = new Node(4);
  head.next.next = new Node(6);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(2);
  
  console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);
  
  head.next.next.next.next.next = new Node(2);
  console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);