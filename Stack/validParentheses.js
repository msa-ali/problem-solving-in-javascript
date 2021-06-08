/**
 * 
 * Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
    The following rules define a valid string:
    Any left parenthesis '(' must have a corresponding right parenthesis ')'.
    Any right parenthesis ')' must have a corresponding left parenthesis '('.
    Left parenthesis '(' must go before the corresponding right parenthesis ')'.
    '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
    Example 1:
    Input: s = "()"
    Output: true

    Example 2:
    Input: s = "(*)"
    Output: true

    Example 3:
    Input: s = "(*))"
    Output: true
 * 
 */




/**
 * @param {string} s
 * @return {boolean}
 * "(**())))"
 */
 var checkValidString = function(s) {
    if(!s.length) return true;
    let star = [];
    const stack = [];
    const len = s.length;
    for(let i=0; i< len; i++) {
        const char = s[i];
        if(char === '(') stack.push(i);
        else if(char === ')') {
            if(stack.length) stack.pop();
            else if(star.length > 0) {
                star.pop()
            }
            else return false;
        } else star.push(i);
    }
    if(stack.length === 0) return true;
    for(let i = stack.length-1; i >=0; i--) {
        if(!star.length) return false;
        const maxStarIndex = star.pop();
        if(maxStarIndex < stack[i]) return false;
    }
    return true;
}