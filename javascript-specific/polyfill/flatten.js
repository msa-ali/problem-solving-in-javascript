Array.prototype.flatten = function () {
    let flatArray = [];
    for(let item of this) {
        if(Array.isArray(item)) {
            flatArray = flatArray.concat(this.flatten.call(item));
        } else {
            flatArray.push(item);
        }
    }
    return flatArray;
}

console.log([[1,2,3],4,5,6,[7,[8,[9]]]].flatten());