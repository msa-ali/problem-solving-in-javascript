/*
    Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.
    
    Example 1:
    Input: s = "(()"
    Output: 2
    Explanation: The longest valid parentheses substring is "()".

    Example 2:
    Input: s = ")()())"
    Output: 4
    Explanation: The longest valid parentheses substring is "()()".

    Example 3:
    Input: s = ""
    Output: 0

    https://leetcode.com/problems/longest-valid-parentheses/
*/

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const stack = [];
    stack.push(-1);
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (!stack.length) stack.push(i);
            else {
                const topOfTheStack = stack[stack.length - 1];
                max = Math.max(max, i - topOfTheStack);
            }
        }
    }
    return max;
};

