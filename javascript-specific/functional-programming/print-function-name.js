/**
 * 
 * @param {Function} fn 
 * @returns 
 */
export function printOnInvoke(fn) {
    return (...args) => {
        console.log(fn.name, args);
        return fn(...args);
    }
}

function add(a, b) {
    return a + b;
}

const updatedAdd = printOnInvoke(add);

console.log(updatedAdd(10, 20));