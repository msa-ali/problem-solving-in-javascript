class DoublyLinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    insertAtFront(data) {
        const newNode = new DoublyLinkedListNode(data);
        if(!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    insertAtTail(data) {
        const newNode = new DoublyLinkedListNode(data);
        if(!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    deleteAtHead() {
        let nodeToBeDeleted = null;
        if(this.head) {
            nodeToBeDeleted = this.head;
            if(this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.head = nodeToBeDeleted.next;
                nodeToBeDeleted.next.prev = null;
            }
            this.size--;
        }
        return nodeToBeDeleted;
    }

    deleteAtTail() {
        let nodeToBeDeleted = null;
        if(this.tail) {
            nodeToBeDeleted = this.tail;
            if(this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.tail = nodeToBeDeleted.prev;
                nodeToBeDeleted.prev.next = null;
            }
            this.size--;
        }
        return nodeToBeDeleted;
    }

    findStartingHead(value) {
        if(this.head) {
            let temp = this.head;
            while(temp) {
                if(temp.data === value) return true;
                temp = temp.next;
            }
        }
        return false;
    }

    findStartingTail(value) {
        if(this.tail) {
            let temp = this.tail;
            while(temp) {
                if(temp.data === value) return true;
                temp = temp.prev;
            }
        }
        return false;
    }

    print() {
        let temp = this.head;
        while(temp) {
            const val = typeof temp.data.data === 'object' ? JSON.stringify(temp.data.data) : temp.data.data;
            console.log(`[${val}] => `);
            temp = temp.next;
        }
        console.log("null");
    }
}

module.exports = {DoublyLinkedList, DoublyLinkedListNode};