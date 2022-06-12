class Queue {

    constructor() {
        this.in = [];
        this.out = [];
    }

    // O(1)
    enqueue(val) {
        this.in.push(val);
    }

    // O(N)
    dequeue() {
        if(!this.out.length) {
            while(this.in.length) {
                this.out.push(this.in.pop());
            }
        }
        return this.out.pop();
    }
    // O(N)
    peek() {
        if(!this.out.length) {
            while(this.in.length) {
                this.out.push(this.in.pop());
            }
        }
        return this.out[this.out.length - 1];
    }

    // O(1)
    empty() {
        return this.in.length === 0 && this.out.length === 0;
    }

}