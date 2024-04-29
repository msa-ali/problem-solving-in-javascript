/*
    Implement Array.map method
*/

class CustomArray {
    #data = [];

    constructor(...args) {
        this.#data = new Array(...args);
    }

    forEach(callback) {
        for(const [index, value] of this.#data.entries()) {
            callback(value, index, this.#data)
        }
    }

    map(callback) {
        const result = [];
        for(const [index, value] of this.#data.entries()) {
            result.push(callback(value, index));
        }
        return result;
    }

    reduce(callback, initialValue) {
        let result = typeof initialValue !== 'undefined' ? initialValue : 0;
        for(const [index, value] of this.#data.entries()) {
            result = callback(result, value, index);
        }
        return result;
    }

    filter(callback) {
        const result = [];
        for(const [index, value] of this.#data.entries()) {
            if(callback && callback(value, index)) {
                result.push(value);
            }
        }
        return result;
    }

    find(callback) {
        let result = null;
        for(const [index, value] of this.#data.entries()) {
            if(callback && callback(value, index)) {
                result = value;
                break;
            }
        }
        return result;
    }

    some(callback) {
        for(const [index, value] of this.#data.entries()) {
            if(callback && callback(value, index)) {
                return true;
            }
        }
        return false;
    }

    every(callback) {
        for(const [index, value] of this.#data.entries()) {
            if(callback && !callback(value, index)) {
                return false;
            }
        }
        return true;
    }

    flatten(depth = 1) {
        debugger;
        const result = [];
        for(let val of this.#data) {
         if(!Array.isArray(val) || depth === 0) {
             result.push(val);
         } else {
             result.push(this.flatten.call(new CustomArray(...val), depth - 1 ))
         }   
        }
        return result;
    }
}


const myarr = new CustomArray(1,2,3,4,5,6,7);
console.log(myarr);

// map
console.log(myarr.map((value) =>  value * 2));
console.log(myarr.map((curr, index) =>  ({currentIndex: index, currentValue: curr})));

// reduce
console.log(myarr.reduce((result, current, index) => {
    result.push({currentIndex: index, currentValue: current});
    return result;
}, []));
console.log(myarr.reduce((sum, current) => sum + current));

// filter
console.log(myarr.filter(curr => curr % 2 === 0));
console.log(myarr.filter());

// find
console.log(myarr.find(curr => curr % 2 === 0));
console.log(myarr.find(curr => curr % 8 === 0));
console.log(myarr.find());


const arr = new CustomArray([1,2,3], [4], [5]);
console.log(arr.flatten(1));