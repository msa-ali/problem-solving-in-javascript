/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */

function printLinkedList(head) {
    if(!head) return;
    console.log(head.data);
    printLinkedList(head.next);
}

function getNode(data, next) {
    return {data, next};
}

function insertNodeAtTail(head, data) {
    const newNode = getNode(data, null);
    if(!head) return newNode;
    let temp = head;
    while(temp.next) temp = temp.next;
    temp.next = newNode;
    return head;
}

function insertNodeAtHead(head, data) { 
    if(!head) return getNode(data, null);;
    return getNode(data, head);
}

function insertNodeAtPosition(head, data, position) {
    if(!head || position === 0) return getNode(data, head || null);
    let count = 0, temp = head;
    while(count !== position-1 && temp !== null) {
        temp = temp.next;
        count++;
    }
    const next = temp ? temp.next: null;
    temp.next = getNode(data, next);
    return head;
}

function deleteNode(head, position) {
    if(!head) return null;
    if(position === 0){
        head = head.next;
        return head;
    }
    let count = 0, temp = head;
    while(count !== position - 1 && temp !== null) {
        temp = temp.next;
        count++;
    }
    const nodeToBeDeleted = temp && temp.next;
    if(temp) {
        temp.next = nodeToBeDeleted ? nodeToBeDeleted.next : null;
    }
    return head;
}

function reversePrint(head) {
    if(!head) return;
    reversePrint(head.next);
    console.log(head.data);
}
// Given pointers to the heads of two sorted linked lists, 
// merge them into a single, sorted linked list. 
// Either head pointer may be null meaning that the corresponding list is empty.
function mergeLists(head1, head2) {
    if( !head1 || !head2) return head1 || head2;
    let temp1 = head1, temp2 = head2;
    let mergedList, currentPointer;
    while(temp1 && temp2) {
        const d1 = temp1.data;
        const d2 = temp2.data;
        const smallerNode = d1 <= d2 ? temp1 : temp2;
        if(!currentPointer && !mergedList) {
            mergedList = getNode(smallerNode.data, null);
            currentPointer = mergedList;
        }
        else {
            currentPointer.next = smallerNode;
            currentPointer = currentPointer.next;
        }
        if(smallerNode === temp1) temp1 = temp1.next;
        else temp2 = temp2.next;  
    }
    if(temp1) {
        currentPointer.next =temp1;
    }
    if(temp2) {
        currentPointer.next =temp2;
    }
    return mergedList;
}

function hasCycle(head) { 
    const visited = new Set();
    let hasCycle = 0, temp = head;;
    if(!head || !head.next) return 0;
    while(temp) {
        if(visited.has(temp)) {
            hasCycle = 1;
            break;
        }
        visited.add(temp);
        temp = temp.next;
    }
    return hasCycle;
}

function reverseSingleLinkedList(head) {
    let node = head;
    let prev = null;
    while(node) {
        const temp = node.next;
        node.next = prev;
        prev = node;
        node = temp;
    }
    return node;
}

