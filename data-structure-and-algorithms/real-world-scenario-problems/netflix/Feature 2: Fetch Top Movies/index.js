/*
    Enable the user to view the top-rated movies worldwide, 
    given that we have movie rankings available separately for different geographic regions.

    Now, we need to build a criterion so the top movies from multiple countries will combine into a single list
    of top-rated movies. In order to scale, the content search is performed in a distributed fashion. 
    Search results for each country are produced in separate lists. 
    Each member of a given list is ranked by popularity, with 1 being most popular and popularity decreasing
    as the rank number increases.

    We’ll be given n lists that are all sorted in ascending order of popularity rank. 
    We have to combine these lists into a single list that will be sorted by rank in ascending order, 
    meaning from best to worst.

    List 1: 11 -> 23 -> 32 -> 38

    List 2: 1 -> 44

    List 3: 23 -> 57 -> 99

    Result: 1 -> 11 -> 23 -> 23 -> 32 -> 38 -> 44 -> 57 -> 99

*/
import { LinkedListNode, createLinkedList, toList } from './LinkedList.js'

// Driver code
const a = createLinkedList([11, 41, 51]);
const b = createLinkedList([21, 23, 42]);
const c = createLinkedList([25, 56, 66, 72]);

// res = mergeKCounty([a, b, c]);
// console.log(toList(res));

function mergeTwoList(head1, head2) {
    if (!head1 || !head2) {
        return head1 || head2;
    }

    let mergedHead;

    if (head1.data <= head2.data) {
        mergedHead = head1;
        head1 = head1.next
    } else {
        mergedHead = head2;
        head2 = head2.next;
    }
    const result = mergedHead;
    while (head1 && head2) {
        if (head1.data <= head2.data) {
            mergedHead.next = head1;
            head1 = head1.next;
        } else {
            mergedHead.next = head2;
            head2 = head2.next;
        }
        mergedHead = mergedHead.next;
    }
    while (head1) {
        mergedHead.next = head1;
        head1 = head1.next;
        mergedHead = mergedHead.next;
    }
    while (head2) {
        mergedHead.next = head2;
        head2 = head2.next;
        mergedHead = mergedHead.next;
    }
    return result;
}


function mergeKLists(lists) {
    if (lists.length > 0) {
        let res = lists[0];
        for (var i = 1; i < lists.length; i++) {
            res = mergeTwoList(res, lists[i]);
        }
        return res;
    }
}

console.log(toList(mergeKLists([a, b, c])));