/**
 * https://leetcode.com/problems/fruit-into-baskets/
 * @param {number[]} fruits
 * @return {number}
 */
 var totalFruit = function(fruits) {
    if(!fruits || !fruits.length) return 0;
    
    if(fruits.length < 3) return fruits.length;
    
    let start = end = 0;
    let maxFruits = Number.NEGATIVE_INFINITY;
    let map = {};
    
    for(end = 0; end < fruits.length; end++) {
        const rightChar = fruits[end];
        if(!(rightChar in map)) map[rightChar] = 0;
        map[rightChar] += 1;
        while(Object.keys(map).length > 2) {
            const left_char = fruits[start];
            map[left_char] -= 1;
            if(map[left_char] === 0) delete map[left_char];
            start++;
        }
        maxFruits = Math.max(maxFruits, end - start + 1);
    }
    
    return maxFruits;
};