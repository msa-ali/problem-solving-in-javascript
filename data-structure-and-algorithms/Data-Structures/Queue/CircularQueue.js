class MyCircularQueue {
    #size;
    #head;
    #tail;
    #queue;

    constructor(size) {
        this.#size = size;
        this.#head = -1;
        this.#tail = -1;
        this.#queue = new Array(size);
    }

    isEmpty() {
        return this.#head === -1;
    }

    isFull() {
        return (this.#tail + 1) % this.#size === this.#head;
    }

    Front() {
        return this.isEmpty() ? -1 : this.#queue[this.#head];
    }

    Rear() {
        return this.isEmpty() ? -1 : this.#queue[this.#tail];
    }

    enQueue(value) {
        if (this.isFull()) {
            return false;
        }

        if (this.isEmpty()) {
            this.#head = 0;
        }

        this.#tail = (this.#tail + 1) % this.#size;
        this.#queue[this.#tail] = value;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) {
            return false;
        }

        if (this.#head === this.#tail) {
            this.#head = -1;
            this.#tail = -1;
        } else {
            this.#head = (this.#head + 1) % this.#size;
        }

        return true;
    }
}

/** 
 * Example Usage:
 * const circularQueue = new MyCircularQueue(3);
 * console.log(circularQueue.enQueue(1)); // true
 * console.log(circularQueue.enQueue(2)); // true
 * console.log(circularQueue.enQueue(3)); // true
 * console.log(circularQueue.enQueue(4)); // false (Queue is full)
 * console.log(circularQueue.Rear());     // 3
 * console.log(circularQueue.isFull());   // true
 * console.log(circularQueue.deQueue());  // true
 * console.log(circularQueue.enQueue(4)); // true
 * console.log(circularQueue.Rear());     // 4
 */

/** 
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */