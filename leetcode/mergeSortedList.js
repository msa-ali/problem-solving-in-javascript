/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
    if(!l1 || !l2) return l1 || l2;
    let temp1 = l1, temp2 = l2;
    
    let newList; let newListHead;
    while(temp1 && temp2) {
        if(temp1.val <= temp2.val) {
            if(!newList) {
                newList = temp1;
                newListHead = newList;
            }else {
                newList.next = temp1;
                newList = newList.next;
            }
            temp1 = temp1.next;
        } else {
            if(!newList) {
                newList = temp2;
                newListHead = newList;
            }else {
                newList.next = temp2;
                newList = newList.next;
            }
            temp2 = temp2.next;
        }
    }
    while(temp1) {
        newList.next = temp1;
        newList = newList.next;
        temp1 = temp1.next;
    }
    while(temp2) {
        newList.next = temp2;
        newList = newList.next;
        temp2 = temp2.next;
    }
    return newListHead;
};
// [1,2,4]
// [1,3,4]
const head1 = {val: -9, next: {val: 3}};
const head2 = {val: 5, next: {val: 7}};

console.log(JSON.stringify(mergeTwoLists(head1, head2), null, 2));