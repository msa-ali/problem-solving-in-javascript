// This is an input class. Do not edit.
class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// Feel free to add new properties and methods to the class.
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    setHead(node) {
        if (!this.head) {
            this.head = node;
            this.head.next = null;
            this.head.prev = null;
        } else {
            node.next = this.head;
            node.prev = null;
            this.head = node;
        }
    }

    setTail(node) {
        if (!this.head) {
            this.head = this.tail = node;
            this.head.next = null;
            this.tail.next = null;
            this.head.prev = null;
            this.tail.prev = null;
        } else {
            const temp = this.tail;
            node.prev = temp;
            temp.next = node;
            this.prev = node;
            this.prev.next = null;
        }
    }

    insertBefore(node, nodeToInsert) {
        if (node === this.head) {
            return this.setHead(nodeToInsert);
        }
        let temp = this.head.next;
        while (temp) {
            if (temp === node) {
                const prev = temp.prev;
                prev.next = nodeToInsert;
                nodeToInsert.prev = prev;
                nodeToInsert.next = temp;
                temp.prev = nodeToInsert;
                return;
            }
            temp = temp.next;
        }
        throw new Error('insertBefore: Node not found');
    }

    insertAfter(node, nodeToInsert) {
        let temp = this.head;
        while (temp) {
            if (temp === node) {
                const {next} = temp;
                if(next) {
                    next.prev = nodeToInsert;
                }
                temp.next = nodeToInsert;
                nodeToInsert.prev = temp;
                nodeToInsert.next = next;
                return;
            }
            temp = temp.next;
        }
        throw new Error('insertAfter: node not found');
    }

    insertAtPosition(position, nodeToInsert) {
        let currentPosition = 1;
        let temp = this.head;
        while(currentPosition !== position) {
            temp = temp.next;
            currentPosition++;
        }
        if(!temp) {
            return setTail(nodeToInsert);
        }

        const {prev} = temp;
        if(prev) {
            prev.next = nodeToInsert;
        }
        nodeToInsert.prev = prev;
        nodeToInsert.next = temp;
        temp.prev = nodeToInsert;
        if(temp.next === null) {
            this.tail = temp;
        }
        if(temp.prev === null) {
            this.head = temp;
        }
    }

    removeNodesWithValue(value) {
        if (this.head.value === value) {
            return this.remove(this.head);
        }
        if (this.tail.value === value) {
            return this.remove(this.tail);
        }
        let temp = this.head.next;
        while (temp) {
            if (temp.value === value) {
                let prev = temp.prev;
                let next = temp.next;
                temp.prev = null;
                temp.next = null;
                prev.next = next;
                next.prev = prev;
                return
            }
            temp = temp.next;
        }
        throw new Error('removeNodesWithValue:  value not found!')
    }

    remove(node) {
        if (node === this.head) {
            let temp = this.head.next;
            this.head.next = null;
            temp.prev = null;
            this.head = temp;
            return;
        }
        if (node === this.tail) {
            let temp = this.tail.prev;
            temp.next = null;
            this.tail.prev = null;
            this.tail = temp;
            return;
        }
        let temp = this.head.next;
        while (temp) {
            if (temp === node) {
                let prev = temp.prev;
                let next = temp.next;
                temp.prev = null;
                temp.next = null;
                prev.next = next;
                next.prev = prev;
                return
            }
            temp = temp.next;
        }
        throw new Error('remove:  node not found!')
    }

    containsNodeWithValue(value) {
        let temp = this.head;
        while (temp) {
            if (temp.value === value) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }
}

// Do not edit the lines below.
exports.Node = Node;
exports.DoublyLinkedList = DoublyLinkedList;
