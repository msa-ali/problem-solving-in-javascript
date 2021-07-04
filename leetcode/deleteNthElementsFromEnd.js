/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    let listLength = 0, temp = head;
    while(temp.next) {
        temp = temp.next;
        listLength++;
    }
    let count = 0; 
    temp = head;
    if(n === listLength + 1) {
        temp = head.next;
        head.next = null;
        return temp;
    }
    while(count !== listLength - n && temp) {
        temp = temp.next;count++;
    }
    const nodeToBeDeleted = temp && temp.next;
    temp.next = nodeToBeDeleted && nodeToBeDeleted.next;
    if(nodeToBeDeleted) nodeToBeDeleted.next = null; 
    return head;
};
const head = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5}}}}};

console.log(JSON.stringify(removeNthFromEnd(head, 2), null, 2));