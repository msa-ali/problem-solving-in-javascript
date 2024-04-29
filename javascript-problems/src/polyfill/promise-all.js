function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]"
  }

const customAll = function (promises = []) {
    if(!Array.isArray(promises)) {
        throw new Error('Arguments are not iterable!');
    }
    return new Promise((resolve, reject) => {
        const result = [];
        let resolveCounter = promises.length;

        const resolveIfDone = () => --resolveCounter === 0 && resolve(result);

        for(let i = 0; i < promises.length; i++) {
            let promise = promises[i];
            if(!isPromise(promise)) {
                promise = Promise.resolve(promise);
            }
           result.push(promise.then((res) => {
                result[i] = res;
                resolveIfDone();
            }).catch((err) => reject(err)));     
        }
    })
}

const p1 = new Promise(resolve => setTimeout(() => resolve('p1'), 5000));
const p2 = Promise.resolve(5);
const p3 = 4;
const p4 = Promise.reject('some error');

customAll([p1, p2, p3, p4]).then(console.log).catch(console.error);