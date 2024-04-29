// Arguments to this function are passed on the left
function partialLeft (f, ...outerArgs) {
    return function(...innerArgs) {
        const args = [...outerArgs, ...innerArgs];
        return f.apply(this, args);
    }
}

// // Arguments to this function are passed on the right
function partialRight (f, ...outerArgs) {
    return function(...innerArgs) {
        const args = [...innerArgs, ...outerArgs];
        return f.apply(this, args);
    }
}
/**
 * Arguments to this function serve as a template.
 * Undefined values in the argument list are filled with values from the inner args
 * @param {*} f 
 * @param  {...any} outerArgs 
 */
function partial (f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs];
        let innerIndex = 0;
        // loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if(args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    }
}

const f = (x, y, z) => x * ( y - z);

console.log(partialLeft(f, 2)(3, 4)); // 2 * ( 3 - 4)

console.log(partialRight(f, 2)(3, 4)); // 3 * (4 - 2)

console.log(partial(f, undefined, 2)(3, 4)); // 3 * ( 2 - 4)