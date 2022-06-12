/*
    Given a number sequence, find the length of its Longest Increasing Subsequence (LIS). In an increasing subsequence, all the elements are in increasing order (from lowest to highest).

    Example 1:

    Input: {4,2,3,6,10,1,12}
    Output: 5
    Explanation: The LIS is {2,3,6,10,12}.
    Example 1:

    Input: {-4,10,3,7,15}
    Output: 4
    Explanation: The LIS is {-4,3,7,15}.
 */


const findLISLength = function (nums = []) {
    let dp = [];

    const recursion = (prev, curr, length) => {
        if(curr === nums.length) return length;
        dp[curr] = dp[curr] || [];
        if (typeof dp[curr][prev + 1] !== 'undefined')  {
            return dp[curr][prev + 1];
        }
        let l1 = l2 = Number.MIN_VALUE;
        if( prev === -1 || nums[curr] >= nums[prev]) {
            l1 = recursion(curr, curr + 1, length + 1);
        }
        l2 = recursion(curr, curr + 1, length);
        dp[curr][prev + 1] = Math.max(l1, l2);
        return dp[curr][prev + 1];
    }

    return recursion(-1, 0, 0)
};

const findLISLengthBU = function(nums) {
    const dp = Array(nums.length).fill(0);
    dp[0] = 1;
  
    let maxLength = 1;
    for (let i = 1; i < nums.length; i++) {
      dp[i] = 1;
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j] && dp[i] <= dp[j]) {
          dp[i] = dp[j] + 1;
          maxLength = Math.max(maxLength, dp[i]);
        }
      }
    }
    return maxLength;
  };
  
  console.log(
    `Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`
  );
  console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);

console.log(
    `Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`
);
console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);