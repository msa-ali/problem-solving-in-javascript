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
const asyncParallel = (asyncFns = [], resultCallback) => {
    try {
        if (typeof resultCallback !== 'function') {
            throw new Error('Invalid resultCallback value. Must be a function');
        }
        const asyncCount = asyncFns.length;
        let asyncResults = [];
        let isError = false;
        const singleAsyncResultCallback = (err, result) => {
            if (err) {
                isError = true;
                return resultCallback(err);
            }
            if (!isError) {
                asyncResults.push(result);
                if (asyncResults.length === asyncCount) {
                    resultCallback(null, asyncResults);
                }
            }
        }

        for (let asyncFn of asyncFns) {
            asyncFn(singleAsyncResultCallback);
        }
    } catch (error) {
        return error;
    }
}


const asyncActionValid = (callback) => setTimeout(() => callback(null, Math.random() * 1000), 200);

const asyncActionError = (callback) => setTimeout(() => callback(new Error('Something wrong happened')));



// testing all valid case
let asyncFns = [asyncActionValid, asyncActionValid, asyncActionValid];
asyncParallel(asyncFns, (err, result) => console.log(result));

// testing  error case
asyncFns = [asyncActionValid, asyncActionValid, asyncActionError];
asyncParallel(asyncFns, (err, result) => console.log(result));

console.log(asyncParallel([], null));