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
    this.head = new LFUNode("BUFFER HEAD", null);
    this.tail = new LFUNode("BUFFER TAIL", null);
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
    if (!node) {
      node = new LFUNode(key, value);
      this.keys[key] = node;
      if (this.size !== this.capacity) {
        if (!this.freq[1]) {
          this.freq[1] = new LFUDoublyLinkedList();
        }
        this.freq[1].insertAtHead(node);
        this.size++;
      } else {
        const oldTail = this.freq[this.minFreq].removeAtTail();
        delete this.keys[oldTail.key];
        if (!this.freq[1]) {
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
      if (!this.freq[node.frequency]) {
        this.freq[node.frequency] = new LFUDoublyLinkedList();
      }
      this.freq[node.frequency].insertAtHead(node);
      if (
        oldFreqCount === this.minFreq &&
        Object.keys(this.freq[oldFreqCount]).length === 0
      ) {
        this.minFreq++;
      }
    }
  }

  get(key) {
    let node = this.keys[key];
    if (node) {
      const oldFreqCount = node.frequency;
      node.frequency++;
      this.freq[oldFreqCount].removeNode(node);
      if (!this.freq[node.frequency]) {
        this.freq[node.frequency] = new LFUDoublyLinkedList();
      }
      this.freq[node.frequency].insertAtHead(node);
      if (
        oldFreqCount === this.minFreq &&
        Object.keys(this.freq[oldFreqCount]).length === 0
      ) {
        this.minFreq++;
      }
      return node.value;
    }
    return null;
  }
}
