const { DoublyLinkedList, DoublyLinkedListNode } = require('../Linked List/doubly-linked-list.util');

class LRUCache {
    constructor(capacity) {
        this._cache = new Map();
        this._cacheVals = new DoublyLinkedList();
        this._capacity = capacity;
    }

    get capacity() {
        return this._capacity;
    }

    get size() {
        return this._cache.size;
    }

    has(key) {
        return this._cache.has(key);
    }

    set(key, value) {
        if (!this.has(key)) {
            if (this.size === this.capacity) {
                const deletedNode = this._cacheVals.deleteAtHead();
                deletedNode && this._cache.delete(deletedNode.data.data.key);
            }
            const node = new DoublyLinkedListNode({ key, value });
            this._cacheVals.insertAtTail(node);
            this._cache.set(key, node);
        }
    }

    get(key) {
        if (this.has(key)) {
            const accessedNode = this._cache.get(key);
            const prev = accessedNode.prev;
            const next = accessedNode.next;
            if (next) {
                next.prev = prev;
                prev.next = next;
            } else {
                prev.next = null;
            }
            accessedNode.prev = accessedNode.next = null;
            this._cacheVals.insertAtTail(accessedNode);
            return accessedNode.data;
        }
    }

    printCache() {
        this._cacheVals.print();
    }
}

let cache = new LRUCache(2);
cache.set(10, 20);
cache.printCache();
cache.set(15, 25);
cache.printCache();
cache.set(20, 30);
cache.printCache();
cache.set(25, 35);
cache.printCache();
cache.set(5, 25);
cache.printCache();

module.exports = { LRUCache };

