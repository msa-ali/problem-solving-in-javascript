const obj = [{
    a: 1,
    b: [12,2,3],
    c: {
        d: 1,
        e: [2,3,4],
        f: "home",
        g: {
            name: "ali"
        }
    },
    h: () => {}
}]

const deepClone = (obj) => {
    if(!obj || typeof obj !== 'object') return obj;
    const copy = {};
    for(const key in obj) {
        const val = obj[key];
        if(typeof val === 'function') {
            copy[key] = val.bind(copy);
        } else if(Array.isArray(val)) {
            copy[key] = [...val];
        } else if(typeof val === 'object') {
            copy[key] = deepClone(val);
        } else {
            copy[key] = val;
        }
    }
    return copy;
};

const clonedObj = deepClone(obj);
console.log(clonedObj[0].c === obj[0].c);
console.log(clonedObj[0].c);
// console.log(clonedObj.b === obj.b);
// console.log(clonedObj.c === obj.c);
// console.log(clonedObj.c.e === obj.c.e);
// console.log(clonedObj.c.g === obj.c.g);
// console.log(clonedObj.h === obj.h);
// console.log(typeof clonedObj.h);
// console.log(typeof []);