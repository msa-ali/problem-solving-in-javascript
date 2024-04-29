/*
    Function that operates on functions, taking one or more functions as arguments and returning a new function.
*/

function not(f)  {
    return function(...args) {
        const result = f.apply(this, args);
        return !result;
    }
}

const even = x => x % 2 === 0;

const odd = not(even);

console.log("is 2 even ? :", even(2));
console.log("is 3 odd ? :", odd(3));
console.log("is 4 odd ? :", odd(4));