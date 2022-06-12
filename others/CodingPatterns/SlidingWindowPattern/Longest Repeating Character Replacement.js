/**
 * https://leetcode.com/problems/longest-repeating-character-replacement/
 * https://www.educative.io/courses/grokking-the-coding-interview/R8DVgjq78yR
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
 var characterReplacement = function(s, k) {
    let start = end = 0;
    let maxLength = 0, maxRepeatingChars = 0, map = {};
    
    for(end = 0; end < s.length; end++) {
        const rightChar = s[end];
        if(!(rightChar in map)) map[rightChar] = 0;
        map[rightChar] += 1;
        maxRepeatingChars = Math.max(maxRepeatingChars, map[rightChar]);
        if(end - start - maxRepeatingChars + 1 > k) {
            const leftChar = s[start];
            map[leftChar] -= 1;
            start++;
        }
        maxLength = Math.max(end - start + 1);
    }
    
    return maxLength;
};