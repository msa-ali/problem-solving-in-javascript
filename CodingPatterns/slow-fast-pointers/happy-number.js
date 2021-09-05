/*
Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

https://leetcode.com/problems/happy-number/

*/

/**
 * @param {number} n
 * @return {boolean}
 */
 var isHappy = function(n) {
    let slow = n, fast = n;
    while(true) {
     slow = findSquare(slow);
     fast = findSquare(findSquare(fast));
    if(slow === fast) break;
    }
    return slow === 1;
};

const findSquare = (n) => {
    let sum = 0;
    while(n > 0) {
        const digit = n % 10;
        sum += Math.pow(digit, 2);
        n = Math.floor(n / 10);
    }
    return sum;
}