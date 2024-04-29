/*
    Write a function that take two functions f & g and returns a new function that computes f(g())
*/

const compose = function(f, g) {
    return function(...args) {
        const gResult = g.apply(this, args);
        return f.call(this, gResult);
    }
}

const sum = (...args) => args.reduce((sum, current) => sum + current, 0);

const logger = (sum) => {
    console.log('Total Sum: ', sum);
    return sum;
}

const sumAndLog = compose(logger, sum);

sumAndLog(1,2,3,4,5,6,7,8,9);