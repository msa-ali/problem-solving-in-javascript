function measureExecutionTime(fn) {
    return function(...args) {
        console.time(fn.name);
        const res = fn(...args);
        console.timeEnd(fn.name);
        return  res;
    };
}

function _fib(n) {
    if (n < 2) {
        return n;
    }
    return fib(n-1) + fib(n-2);
}

const fib = measureExecutionTime(_fib);

console.log(fib(30));