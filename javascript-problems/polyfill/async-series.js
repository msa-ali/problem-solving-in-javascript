/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 * @callback resultCallback
 * @param {Error} error
 * @param {Array} result
 */

/**
 * Run the tasks collection of functions in parallel, without waiting until the previous function has completed.
 * If any of the function pass an error to its callback, the main callback is immediately called with the value of the error.
 * @param {Array} asyncFns 
 * @param {resultCallback} resultCallback 
 * @returns {void} void
 */
 const asyncSeries = (asyncFns = [], resultCallback) => {
    try {
        if (typeof resultCallback !== 'function') {
            throw new Error('Invalid resultCallback value. Must be a function');
        }
        const asyncCount = asyncFns.length;
        let asyncResults = [];
        let isError = false;
        const singleAsyncResultCallback = (index) => (err, result) => {
            if (err) {
                isError = true;
                return resultCallback(err);
            }
            if (!isError) {
                asyncResults[index] = result;
                if (asyncResults.filter(Boolean).length === asyncCount) {
                    resultCallback(null, asyncResults);
                }
            }
        }

        for (let [index, asyncFn] of asyncFns.entries()) {
            asyncFn(singleAsyncResultCallback(index));
            if(isError) {
                break;
            }
        }
    } catch (error) {
        return error;
    }
}


const asyncActionValid = (callback) => setTimeout(() => callback(null, Math.random() * 1000), 200);

const asyncActionValidMsg = (msg, timeout) => (callback) => setTimeout(() => callback(null, msg), timeout);

const asyncActionError = (callback) => setTimeout(() => callback(new Error('Something wrong happened')));



// testing all valid case
let asyncFns = [asyncActionValidMsg('order1', 4000), asyncActionValidMsg('order2', 1000), asyncActionValidMsg('order3', 100)];
asyncSeries(asyncFns, (err, result) => console.log(result));

// // testing  error case
// asyncFns = [asyncActionValid, asyncActionValid, asyncActionError];
// asyncParallel(asyncFns, (err, result) => console.log(result));

// console.log(asyncParallel([], null));