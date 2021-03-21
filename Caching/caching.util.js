/** 
 * Caching is the process of storing data into temporary memory
 * so that it can be easily retrieved for later use if it is required again
 * 
 
 * In caching ,the goal is to maximise hits(an item is in the cache when requested) 
 * and minimize misses( an item is not in the cache when requested).
 * 
 */

/**
 * Cache design generally considers two factors:
 *  1. Temporal Locality - A memory location that has been recently accessed is likely to be access again
 *  2. Spatial Locality - A memory location near one that has recently been accessed is likely to be accessed again 
 */

/**
 * Two caching techniques :
 *  1. Least Frequently Used ( LFU )
 *  2. Least Recently Used ( LRU )
 */

/**
 * Least Frequently Used ( LFU )
 * It is a caching algorithm used by OS to manage memory. The system tracks the number of times a block is referenced in the memory.
 * By design, when the cache exceeds its limit, the system deletes the item with the lowest reference frequency.
 * LFU is uncommon as when an item in memory is referened repeatedly for a short amt of time, the frequency for that block is high but this forces
 * the system to delete other blocks tht may be used more frequently outside the short block of time. Also new items in the system are susceptible
 * to being deleted quickly because of their lower frequency of being accessed.
 * SOME USECASE OF LFU - MOBILE KEYBOARD APPS. Suggested workds appear on the keyboard apps and it makes sense to implement this
 * using LFU caching since the user likely uses the same words often.
 */

class LFUNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.frequency = 1;
    }
}

class LFUDoublyLinkedList {
    constructor() {
        this.head = new LFUNode('BUFFER HEAD', null);
        this.tail = new LFUNode('BUFFER TAIL', null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }

    insertAtHead(node) {
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
        this.size++;
    }

    removeAtTail() {
        const nodeToBeRemoved = this.tail.prev;
        this.tail.prev = nodeToBeRemoved.prev;
        nodeToBeRemoved.prev.next = this.tail;
        this.size--;
        return nodeToBeRemoved;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.size--;
    }
}

class LFUCache {
    constructor(capacity) {
        this.keys = {};
        this.freq = {};
        this.capacity = capacity;
        this.minFreq = 0;
        this.size = 0;
    }

    set(key, value) {
        let node = this.keys[key];
        if(!node) {
            node = new LFUNode(key, value );
            this.keys[key] = node;
            if(this.size !== this.capacity) {
                if(!this.freq[1]) {
                    this.freq[1] = new LFUDoublyLinkedList();
                }
                this.freq[1].insertAtHead(node);
                this.size++;
            } else {
                const oldTail = this.freq[this.minFreq].removeAtTail();
                delete this.keys[oldTail.key];
                if(!this.freq[1]) {
                    this.freq[1] = new LFUDoublyLinkedList();
                }
                this.freq[1].insertAtHead(node);
            }
            this.minFreq = 1;
        } else {
            const oldFreqCount = node.frequency;
            node.data = value;
            node.frequency++;
            this.freq[oldFreqCount].removeNode(node);
            if(!this.freq[node.frequency]) {
                this.freq[node.frequency] = new LFUDoublyLinkedList();
            }
            this.freq[node.frequency].insertAtHead(node);
            if(oldFreqCount === this.minFreq && Object.keys(this.freq[oldFreqCount]).length === 0) {
                this.minFreq++;
            }
        }
    }

    get(key) {
        let node = this.keys[key];
        if(node) {
            const oldFreqCount = node.frequency;
            node.frequency++;
            this.freq[oldFreqCount].removeNode(node);
            if(!this.freq[node.frequency]) {
                this.freq[node.frequency] = new LFUDoublyLinkedList();
            }
            this.freq[node.frequency].insertAtHead(node);
            if(oldFreqCount === this.minFreq && Object.keys(this.freq[oldFreqCount]).length === 0) {
                this.minFreq++;
            }
            return node.value;
        }
        return null;
    }


}

