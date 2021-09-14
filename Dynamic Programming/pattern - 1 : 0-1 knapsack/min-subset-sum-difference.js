/*
    Given a set of positive numbers, partition the set into two subsets with a minimum difference between
    their subset sums.

    Example 1:#
    Input: {1, 2, 3, 9}
    Output: 3
    Explanation: We can partition the given set into two subsets where the minimum absolute difference 
    between the sum of numbers is '3'. Following are the two subsets: {1, 2, 3} & {9}.

    Example 2:#
    Input: {1, 2, 7, 1, 5}
    Output: 0
    Explanation: We can partition the given set into two subsets where the minimum absolute difference 
    between the sum of numbers is '0'. Following are the two subsets: {1, 2, 5} & {7, 1}.

    Example 3:#
    Input: {1, 3, 100, 4}
    Output: 92
    Explanation: We can partition the given set into two subsets where the minimum absolute difference 
    between the sum of numbers is '92'. Here are the two subsets: {1, 3, 4} & {100}.
*/

let canPartition = function (nums = [], currentIndex = 0, sum1 = 0, sum2 = 0) {
    if (currentIndex >= nums.length) return Math.abs(sum1 - sum2);
    // recursive call after including the number at the currentIndex in the first set
    const res1 = canPartition(nums, currentIndex + 1, sum1 + nums[currentIndex], sum2);
    // // recursive call after including the number at the currentIndex in the second set
    const res2 = canPartition(nums, currentIndex + 1, sum1, sum2 + nums[currentIndex]);
    return Math.min(res1, res2);
};

const canPartitionTopDown = function(num) {
    const dp = [];
  
    function canPartitionRecursive(num, currentIndex, sum1, sum2) {
      // base check
      if (currentIndex === num.length) return Math.abs(sum1 - sum2);
  
      dp[currentIndex] = dp[currentIndex] || [];
      // check if we have not already processed similar problem
      if (typeof dp[currentIndex][sum1] === 'undefined') {
        // recursive call after including the number at the currentIndex in the first set
        const diff1 = canPartitionRecursive(num, currentIndex + 1, sum1 + num[currentIndex], sum2);
  
        // recursive call after including the number at the currentIndex in the second set
        const diff2 = canPartitionRecursive(num, currentIndex + 1, sum1, sum2 + num[currentIndex]);
  
        dp[currentIndex][sum1] = Math.min(diff1, diff2);
      }
      return dp[currentIndex][sum1];
    }
  
    return canPartitionRecursive(num, 0, 0, 0);
  };
  
  console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 3, 9])}`);
  console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 7, 1, 5])}`);
  console.log(`Minimum subset difference is: ---> ${canPartition([1, 3, 100, 4])}`);

console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 3, 9])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 7, 1, 5])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 3, 100, 4])}`);
