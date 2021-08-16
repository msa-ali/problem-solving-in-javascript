function memoize(f) {
    const cache = new Map();

    return function(...args) {
        let key = args.length + args.join("+");
        if(cache.has(key)) {
            return cache.get(key);
        } else {
            let result = f.apply(this, args);
            cache[key] = result;
            return result;
        }
    }
}

function gcd (a, b) {
    if( a < b ) {
        [a, b] = [b, a];
    }
    while(b!== 0) {
        console.log('before: ',[a, b]);
        [a, b] = [b, a%b];
        console.log('after: ',[a, b]);
        console.log('\n');
    }
    return a;
}

const gcdMemo = memoize(gcd);

console.log(gcdMemo(85, 187));