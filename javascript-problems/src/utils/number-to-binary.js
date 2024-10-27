/**
 * Convert a positive number to its binary representation
 * 
 * Algorithm:
 * Divide the number by 2 and write down the remainder.
 * Continue dividing the quotient by 2 until you reach a quotient of 0, recording each remainder.
 * The binary representation is the remainders read from the bottom up.
 * @param {number} num 
 */
function positiveNumberToBinary(num, bits = 8) {
    if (num === 0) return 0;
    let result = '';
    let quotient = num;
    while(quotient !== 0) {
        const remainder = quotient % 2;
        quotient = Math.floor(quotient / 2);
        result = remainder + result;
    }
    result = result.padStart(bits, '0');
    return result;
}

/*
For representing negative numbers in binary, 
we generally use two's complement representation, which is the standard method in computing. Here’s how it works:
- Convert the absolute value of the number to binary.
- Pad the binary number to a specific bit length (e.g., 8 bits or 16 bits).
- Invert all bits (turn 1s to 0s and 0s to 1s) — this is called the one's complement.
- Add 1 to the one's complement to get the two's complement.
*/
function negativeNumberToBinary(num, bits = 8) {
    const binaryRepresentation = positiveNumberToBinary(Math.abs(num), bits);
    const invertedBinary = [...binaryRepresentation].map(bit => bit === '0' ? '1' : '0');
    let carry = '1';
    let result = '';
    for(let i = bits - 1; i >= 0; i--) {
        const char = invertedBinary[i];
        if (char === '1' && carry === '1') {
            carry = '1';
            result = '0' + result;
        } else if (char === '0' && carry === '1') {
            carry = '0';
            result = '1' + result;
        } else {
            result = char + result; // No change if carry is 0
        }
    }
    return result
}

console.log(positiveNumberToBinary(4));
console.log(negativeNumberToBinary(-42));
