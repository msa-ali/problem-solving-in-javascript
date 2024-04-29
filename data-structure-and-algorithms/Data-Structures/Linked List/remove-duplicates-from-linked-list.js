// https://leetcode.com/problems/remove-duplicates-from-sorted-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if (!head || !head.next) {
        return head;
    }

    let current = head;
    let prevNonDuplicateNode = null;

    while (current) {
        if (!prevNonDuplicateNode || current.val !== prevNonDuplicateNode.val) {
            prevNonDuplicateNode = current;
            current = current.next;
        } else {
            const temp = current.next;
            prevNonDuplicateNode.next = temp;
            current.next = null;
            current = temp;
        }
    }
    return head;
};