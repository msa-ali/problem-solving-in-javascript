function isNumber(char) {
    return /\d/.test(char);
}

function isWhitespace(char) {
    return /\s/.test(char);
}

/**
 * 
 * @param {string} expression 
 */
export function calculator(expression) {
    const len = expression.length;
    let stack = [];
    let i = 0;
    let sum = 0;
    let sign = 1;

    while (i < len) {
        let char = expression[i];

        if (isWhitespace(char)) {
            i++;
            continue;
        }

        if (isNumber(char)) {
            let current = '';
            while(i < len && isNumber(char)) {
                current += char;
                i++;
                char = expression[i];
            }
            sum += sign * parseInt(current, 10)
            continue;
        }

        if (char === '+') {
            sign = 1;
            i++;
            continue;
        }

        if (char === '-') {
            sign = -1;
            i++;
            continue;
        }

        if (char === '(') {
            stack.push(sum);
            stack.push(sign);
            sum = 0;
            sign = 1;
            i++;
            continue;
        }

        if (char === ')') {
            const previousSign = stack.pop();
            const previousSum = stack.pop();
            sum = sum * previousSign;
            sum += previousSum;
        }
        i++;
    }
    return sum;
}