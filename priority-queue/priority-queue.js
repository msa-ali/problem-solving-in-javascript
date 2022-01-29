export class PriorityQueue {
    #heap = [];
    #comparator;

    constructor(comparator = (a, b) => a > b) {
        this.#heap = [];
        this.#comparator = comparator;
    }

    get size() {
        return this.#heap.length;
    }

    isEmpty() {
        return this.#heap.length === 0;
    }

    peek() {
        return this.#heap[0];
    }

    push(value) {
        this.#heap.push(value);
        this.#siftUp();
        return this.size;
    }

    pop() {
        if (this.size > 0) {
            this.#swap(0, this.size - 1);
            const poppedValue = this.#heap.pop();
            this.#siftDown();
            return poppedValue;
        }
    }

    toArray() {
        return [...this.#heap];
    }

    print() {
        console.log(this.#heap.join(', '));
    }

    #parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #leftChild(index) {
        return index * 2 + 1;
    }

    #rightChild(index) {
        return index * 2 + 2;
    }

    #swap(i, j) {
        const temp = this.#heap[i];
        this.#heap[i] = this.#heap[j];
        this.#heap[j] = temp;
    }

    #compare(i, j) {
        return this.#comparator(this.#heap[i], this.#heap[j]);
    }

    #siftUp() {
        let nodeIdx = this.size - 1;

        while (nodeIdx > 0 && this.#compare(nodeIdx, this.#parent(nodeIdx))) {
            this.#swap(nodeIdx, this.#parent(nodeIdx));
            nodeIdx = this.#parent(nodeIdx);
        }
    }

    #siftDown() {
        let nodeIdx = 0;

        while (
            (this.#leftChild(nodeIdx) < this.size &&
                this.#compare(this.#leftChild(nodeIdx), nodeIdx)) ||
            (this.#rightChild(nodeIdx) < this.size &&
                this.#compare(this.#rightChild(nodeIdx), nodeIdx))
        ) {
            const greaterChildIdx =
                this.#rightChild(nodeIdx) < this.size &&
                    this.#compare(this.#rightChild(nodeIdx), this.#leftChild(nodeIdx))
                    ? this.#rightChild(nodeIdx)
                    : this.#leftChild(nodeIdx);

            this.#swap(greaterChildIdx, nodeIdx);
            nodeIdx = greaterChildIdx;
        }
    }
}

const priorityQueue = new PriorityQueue();

priorityQueue.push(1);
priorityQueue.push(10);
priorityQueue.push(5);
priorityQueue.push(7);
priorityQueue.push(20);
priorityQueue.push(-1);
priorityQueue.push(21);

while (!priorityQueue.isEmpty()) {
    console.log(priorityQueue.pop());
}