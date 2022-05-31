Array.prototype.customFlatten = function (level = Number.POSITIVE_INFINITY) {
    const result = [];
    for(let val of this) {
        if(!Array.isArray(val) || level === 0) {
            result.push(val);
        } else {
            result.push(...val.customFlatten(level - 1));
        }
    }
    return result;
}


let arr = [
    [1, 2],
    [3, 4],
    [[5, 6],[7, 8, 9]],
    [[10, 11], [12], [[13], [14], 15]]
];
console.log(arr.customFlatten(2));