/**
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function(s, p) {
    const result = [];
    let start = end = 0;
    const patternMap = p.split('').reduce((map, current) => {
        if(!(current in map)) map[current] = 0;
        map[current] += 1;
        return map;
    }, {});
    let matched = 0;
    for(end = 0; end < s.length; end++) {
        let rightChar = s[end];
        if(rightChar in patternMap) {
            patternMap[rightChar] -= 1;
            if(patternMap[rightChar] === 0) {
                matched++;
            }
        }
        
        if(matched === Object.keys(patternMap).length) {
            result.push(start);
        }
        
        if(end >= p.length-1) {
            const leftChar = s[start];
            start++;
            if(leftChar in patternMap) {
                if(patternMap[leftChar] === 0) {
                    matched--;
                }  
                patternMap[leftChar] += 1;
            }
            
        }
    }
    return result;
};