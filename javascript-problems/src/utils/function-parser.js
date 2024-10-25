/*Parse strings that form a simple language as follows:
input -> "add(1,3)" output -> 4
input -> "sub(1,3)" output -> -2

operations take only 2 params. commands may be nested.
ie. "add(sub(333,4), 1)" "sub(add(238943, 2343), add(1, sub(323, 43)))"

max string length is 1024 chars handle white space give some sort of basic syntax error handling for invalid strings. Error message must include the position in the string where the error
*/

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

const fnMap = {
    "add": add,
    "sub": sub,
};

const VALID_FUNCTIONS = ["add", "sub"];
const VALID_CHARACTERS = new Set(['a', 'd', 's', 'u', 'b', ' ', '(', ')', ',']);

const isValidFunction = (str) => VALID_FUNCTIONS.includes(str);

const isNumber = (str) => !Number.isNaN(parseInt(str));

const getStringType = (str) => {
    if (isNumber(str)) {
        return 'number';
    }
    if (isValidFunction(str)) {
        return 'function';
    }
    return 'invalid';
}

class InvalidCharacterError extends Error {
    constructor(char, index) {
        const message = `Invalid Character '${char}' at index ${index}`
        super(message);
    }
}

/**
 * 
 * @param {string} str 
 */
function parseFunction(str) {
    if (!str || !str.length) {
        throw new Error("Invalid input provided");
    }
    const functionStack = [];
    const paramsStack = [];
    let current = "";
    let currentIndex = -1;
    for (const char of str) {
        currentIndex++;
        if (!isNumber(char) && !VALID_CHARACTERS.has(char)) {
            throw new InvalidCharacterError(char, currentIndex);
        }
        let type = getStringType(current);
        switch (char) {
            case " ":
                continue;

            case "(":
                if (!isValidFunction(current)) {
                    throw new InvalidCharacterError(char, currentIndex);
                }
                functionStack.push(current);
                current = "";
                continue;

            case ")":
                if (type !== 'number') {
                    throw new InvalidCharacterError(char, currentIndex);
                }
                const param2 = +current;
                const param1 = +paramsStack.pop();
                const fn = fnMap[functionStack.pop()];
                if (!fn) {
                    throw new InvalidCharacterError(char, currentIndex);
                }
                const result = fn(param1, param2);
                current = result;
                continue;

            case ",":
                if (type === 'invalid') {
                    throw new InvalidCharacterError(char, currentIndex);
                }
                if (type === 'number') {
                    paramsStack.push(current);
                    current = "";
                    continue;
                }
        }
        current += char;
    }
    return current;
}

let result = parseFunction("add(1,3)");
console.log(result);

result = parseFunction("add(sub(333,4), 1)");
console.log(result);

result = parseFunction("add(1, sub(323, 43))");
console.log(result);

