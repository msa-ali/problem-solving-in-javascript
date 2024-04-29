/**
 * @param {string} s
 * @return {number}
 */
 /**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let start = end = 0;
    let map = new Map();
    let max = Number.NEGATIVE_INFINITY;
    for(end = 0; end < s.length; end++) {
        const rightChar = s[end];
        if(map.has(rightChar)) {
            start = Math.max(start, map.get(rightChar) + 1);
        }
        map.set(rightChar, end);
        max = Math.max(max, end - start + 1);
    }
    return max === Number.NEGATIVE_INFINITY ? 0 : max;
};

console.log(lengthOfLongestSubstring("bbbbb"));