/**
 * 
    Given a string s of '(' , ')' and lowercase English characters. 

    Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

    Formally, a parentheses string is valid if and only if:

    It is the empty string, contains only lowercase characters, or
    It can be written as AB (A concatenated with B), where A and B are valid strings, or
    It can be written as (A), where A is a valid string. 

    Input: s = "lee(t(c)o)de)"
    Output: "lee(t(c)o)de"
    Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

    https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
 */

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
    if (!s) return s;
    const openBracketStack = [];
    const unpairedClosingBracketList = [];
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const char = s[i];
        if (char === '(') openBracketStack.push(i);
        if (char === ')') {
            if (openBracketStack.length) openBracketStack.pop();
            else unpairedClosingBracketList.push(i);
        }
    }
    const indexesToRemove = [...openBracketStack, ...unpairedClosingBracketList].sort((a, b) => a - b);
    let result = '';
    let prev = 0;
    for (let i of indexesToRemove) {
        result += s.slice(prev, i);
        prev = i + 1;
    }
    return result + s.slice(prev);
};

