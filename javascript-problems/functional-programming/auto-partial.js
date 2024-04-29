function autoPartial(fn) {
    return function (...args) {
        const totalArgsNeeded = fn.length;
        if (args.length >= totalArgsNeeded) {
            return fn(...args);
        }
        return autoPartial(fn.bind(null, ...args));
    }
}


function _multiply(x, y, z) {
    return x * y * z;
}

console.log(autoPartial(_multiply)(10)(8)(5));

