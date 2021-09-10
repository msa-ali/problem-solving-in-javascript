const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = args.join(',');
        if(cache.has(key)) {
            console.log('picking value from cache for key ', key );
            return cache.get(key);
        }
        cache.set(key, fn.apply(null, args));
        return cache.get(key);
    }
}

const fib = (n) => {
    if(n === 0 || n === 1) return n;
    return fib(n-1) + fib(n-2);
}

const memoFib = memoize(fib);
console.log(memoFib(3));
console.log(memoFib(5));
console.log(memoFib(5));
console.log(memoFib(10));
