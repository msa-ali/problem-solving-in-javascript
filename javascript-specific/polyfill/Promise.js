
class CustomPromise {

    #resolveChain
    #status

    constructor(callback = () => { }) {
        this.#resolveChain = [];
        this.#status = 'pending'
        callback(this.#onResolve.bind(this), this.#onReject.bind(this));
        return this;
    }

    then(cb) {
        this.#resolveChain.push(cb);
        return this;
    }

    #onResolve(value) {
        let intermediateResult = value;
        this.#status = 'resolved';
        while (this.#resolveChain.length) {
            const callbackToBeCalled = this.#resolveChain.shift();
            if (callbackToBeCalled) {
                intermediateResult = callbackToBeCalled(intermediateResult);
            }
        }
    }

    #onReject() {

    }
}

new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve(3), 100);
})
.then(val => val * 2)
.then(val => val * 3)
.then(val => console.log(val));