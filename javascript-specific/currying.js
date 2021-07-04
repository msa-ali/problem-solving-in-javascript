function currying(func) {
    function curriedfunc(...args) {
        if(args.length >= func.length) {
            return func(...args);
        } else {
            return function(...next) {
                return curriedfunc(...args,...next);
            }
        }
    }
    return curriedfunc;
}

function multiply(a, b, c) {
    return a*b*c;
}

let curried = currying(multiply);
console.log(curried(2)(3)(4))
// console.log(curried(2,3)(4))
// console.log(curried(2,3,4))
// console.log(curried(5)(6,7))