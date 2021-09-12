/*
    Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.

    Example 1: ##

    Input: {1, 2, 3, 4}
    Output: True
    Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}
    Example 2: ##

    Input: {1, 1, 3, 4, 7}
    Output: True
    Explanation: The given set can be partitioned into two subsets with equal sum: {1, 3, 4} & {1, 7}
    Example 3: ##

    Input: {2, 3, 4, 6}
    Output: False
    Explanation: The given set cannot be partitioned into two subsets with equal sum.
*/

let canPartition = function (nums = []) {
    const sum = nums.reduce((res, num) => res + num, 0);
    if (sum % 2 !== 0) return false;
    return canPartitionRecursive(nums, sum / 2, 0);
};

function canPartitionRecursive(nums = [], sum, currentIndex, dp = []) {
    if (sum === 0) return true;

    if (nums.length === 0 || currentIndex >= nums.length) return false;

    dp[currentIndex] = dp[currentIndex] || [];
    if (typeof dp[currentIndex][sum] !== 'undefined') {
        console.log('fetching from cache...');
        return dp[currentIndex][sum];
    }

    if (nums[currentIndex] <= sum) {
        if (canPartitionRecursive(nums, sum - nums[currentIndex], currentIndex + 1, dp)) {
            dp[currentIndex][sum] = true;
            return true;
        }
    }
    dp[currentIndex][sum] = canPartitionRecursive(nums, sum, currentIndex + 1, dp);
    return dp[currentIndex][sum];
}
console.log(`Can partitioning be done: ---> ${canPartition([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartition([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartition([2, 3, 4, 6])}`);

let canPartitionBottomUp = function(num) {
    const n = num.length;
    // find the total sum
    let sum = 0;
    for (let i = 0; i < n; i++) sum += num[i];
  
    // if 'sum' is a an odd number, we can't have two subsets with same total
    if (sum % 2 != 0) return false;
  
    // we are trying to find a subset of given numbers that has a total sum of ‘sum/2’.
    sum /= 2;
  
    const dp = Array(n)
      .fill(false)
      .map(() => Array(sum + 1).fill(false));
  
    // populate the sum=0 column, as we can always have '0' sum without including any element
    for (let i = 0; i < n; i++) dp[i][0] = true;
  
    // with only one number, we can form a subset only when the required sum is equal to its value
    for (let s = 1; s <= sum; s++) {
      dp[0][s] = num[0] == s;
    }
  
    // process all subsets for all sums
    for (let i = 1; i < n; i++) {
      for (let s = 1; s <= sum; s++) {
        // if we can get the sum 's' without the number at index 'i'
        if (dp[i - 1][s]) {
          dp[i][s] = dp[i - 1][s];
        } else if (s >= num[i]) {
          // else if we can find a subset to get the remaining sum
          dp[i][s] = dp[i - 1][s - num[i]];
        }
      }
    }
  
    // the bottom-right corner will have our answer.
    return dp[n - 1][sum];
  };
  
  console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([1, 2, 3, 4])}`);
  console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([1, 1, 3, 4, 7])}`);
  console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([2, 3, 4, 6])}`);