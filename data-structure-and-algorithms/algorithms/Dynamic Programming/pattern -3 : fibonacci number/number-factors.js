/*
    Given a number ‘n’, implement a method to count how many possible ways there are to express ‘n’ as the sum of 1, 3, or 4.
    Example 1:
    n : 4
    Number of ways = 4
    Explanation: Following are the four ways we can express 'n' : {1,1,1,1}, {1,3}, {3,1}, {4} 

    Example 2:
    n : 5
    Number of ways = 6
    Explanation: Following are the six ways we can express 'n' : {1,1,1,1,1}, {1,1,3}, {1,3,1}, {3,1,1}, 
    {1,4}, {4,1}
 */

const CountWays = function (n) {
    const dp = [];
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 2;
    for(let i = 4; i<= n; i++) {
        dp[i] = dp[i-1] + dp[i-3] + dp[i-4];
    }
    return dp[n];
};

const CountWaysTopDown = function(n) {
    const dp = [];
  
    function CountWaysRecursive(n) {
      if (n == 0) return 1; // base case, we don't need to subtract any thing, so there is only one way
  
      if (n == 1) return 1; // we can take subtract 1 to be left with zero, and that is the only way
  
      if (n == 2) return 1; // we can subtract 1 twice to get zero and that is the only way
  
      if (n == 3) return 2; // '3' can be expressed as {1,1,1}, {3}
  
      if (typeof dp[n] === 'undefined') {
        // if we subtract 1, we are left with 'n-1'
        const subtract1 = CountWaysRecursive(n - 1);
        // if we subtract 3, we are left with 'n-3'
        const subtract3 = CountWaysRecursive(n - 3);
        // if we subtract 4, we are left with 'n-4'
        const subtract4 = CountWaysRecursive(n - 4);
        dp[n] = subtract1 + subtract3 + subtract4;
      }
  
      return dp[n];
    }
    return CountWaysRecursive(n);
  };

console.log(`Number of ways: ---> ${CountWays(4)}`);
console.log(`Number of ways: ---> ${CountWays(5)}`);
console.log(`Number of ways: ---> ${CountWays(6)}`);