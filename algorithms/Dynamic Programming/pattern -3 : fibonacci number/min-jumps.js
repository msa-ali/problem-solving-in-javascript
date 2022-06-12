/*
    Given an array of positive numbers, where each element represents the max number of jumps that can be made forward from that element, 
    write a program to find the minimum number of jumps needed to reach the end of the array (starting from the first element). If an element is 0, 
    then we cannot move through that element.

    Example 1:
    Input = {2,1,1,1,4}
    Output = 3
    Explanation: Starting from index '0', we can reach the last index through: 0->2->3->4
    
    Example 2:
    Input = {1,1,3,6,9,3,0,1,3}
    Output = 4
    Explanation: Starting from index '0', we can reach the last index through: 0->1->2->3->8

*/

const countMinJumps = function (jumps = []) {
    const countMinJumpsRecursive = (currentIndex) => {
        if (currentIndex === jumps.length - 1) return 0;

        if (jumps[currentIndex] === 0) return Number.MAX_VALUE;

        let start = currentIndex + 1, end = currentIndex + jumps[currentIndex];
        let totalJumps = Number.MAX_VALUE;
        while (start < jumps.length && start <= end) {
            const minJumps = countMinJumpsRecursive(start++);
            if (minJumps !== Number.MAX_VALUE) {
                totalJumps = Math.min(minJumps + 1, totalJumps);
            }
        }
        return totalJumps;
    }
    return countMinJumpsRecursive(0);
};

console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);

const countMinJumpsTopDown = function (jumps) {
    const dp = [];

    function countMinJumpsRecursive(jumps, currentIndex) {
        // if we have reached the last index, we don't need any more jumps
        if (currentIndex === jumps.length - 1) return 0;

        // If an element is 0, then we cannot move through that element
        if (jumps[currentIndex] === 0) return Number.MAX_VALUE;

        // if we have already solved this problem, return the result
        if (typeof dp[currentIndex] === 'undefined') {
            let totalJumps = Number.MAX_VALUE;
            let start = currentIndex + 1;
            const end = currentIndex + jumps[currentIndex];
            while (start < jumps.length && start <= end) {
                // jump one step and recurse for the remaining array
                const minJumps = countMinJumpsRecursive(jumps, start++);
                if (minJumps != Number.MAX_VALUE) totalJumps = Math.min(totalJumps, minJumps + 1);
            }
            dp[currentIndex] = totalJumps;
        }
        return dp[currentIndex];
    }
    return countMinJumpsRecursive(jumps, 0);
};

console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);


const countMinJumpsBottomUp = function(jumps) {
    const dp = Array(jumps.length).fill(0);
  
    // initialize with infinity, except the first index which should be zero as we start from there
    for (let i = 1; i < jumps.length; i++) dp[i] = Number.MAX_VALUE;
  
    for (let start = 0; start < jumps.length - 1; start++) {
      for (let end = start + 1; end <= start + jumps[start] && end < jumps.length; end++) {
        dp[end] = Math.min(dp[end], dp[start] + 1);
      }
    }
  
    return dp[jumps.length - 1];
  };
  
  console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
  console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);