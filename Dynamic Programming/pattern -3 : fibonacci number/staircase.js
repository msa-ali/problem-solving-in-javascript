/*
    Given a stair with ‘n’ steps, implement a method to count how many possible ways are there to reach the top of the staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.

    Example 1:
    Number of stairs (n) : 3
    Number of ways = 4
    Explanation: Following are the four ways we can climb : {1,1,1}, {1,2}, {2,1}, {3} 

    Example 2:
    Number of stairs (n) : 4
    Number of ways = 7
    Explanation: Following are the seven ways we can climb : {1,1,1,1}, {1,1,2}, {1,2,1}, {2,1,1}, 
    {2,2}, {1,3}, {3,1}


*/

const CountWays = (n) => {
    const dp = [];
    const recursion = (n) => {
        // n==0 , base case, we don't need to take any step, so there is only one way
        // n == 1, we can take one step to reach the end, and that is the only way
        if (n === 0 || n === 1) return 1;
        if(dp[n]) {
            console.log('From cache for ', n);
            return dp[n];
        }
        let way1 = way2 = way3 = 0
        if (n - 1 >= 0) way1 = recursion(n - 1);
        if (n - 2 >= 0) way2 = recursion(n - 2);
        if (n - 3 >= 0) way3 = recursion(n - 3);
        dp[n] =  way1 + way2 + way3;
        return dp[n];
    }
    return recursion(n);
};

const CountWaysBottomUp = (n) => {
    const dp = [];

    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;

    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
    }
    return dp[n];
};

console.log(`Number of ways: ---> ${CountWays(3)}`);
console.log(`Number of ways: ---> ${CountWays(4)}`);
console.log(`Number of ways: ---> ${CountWays(5)}`);

console.log(`Number of ways: ---> ${CountWaysBottomUp(3)}`);
console.log(`Number of ways: ---> ${CountWaysBottomUp(4)}`);
console.log(`Number of ways: ---> ${CountWaysBottomUp(5)}`);

/*
    We can optimize the space used in our previous solution. 
    We don’t need to store all the counts up to ‘n’, as we only need three previous numbers to calculate the next count.
    We can use this fact to further improve our solution:
    The below solution has a time complexity of O(n) and a constant space complexity O(1).
*/
const CountWays2 = function(n) {
    if (n < 2) return 1;
    if (n == 2) return 2;
    let n1 = 1,
      n2 = 1,
      n3 = 2,
      temp;
    for (let i = 3; i <= n; i++) {
      temp = n1 + n2 + n3;
      n1 = n2;
      n2 = n3;
      n3 = temp;
    }
    return n3;
  };
  
  console.log(`Number of ways: ---> ${CountWays(3)}`);
  console.log(`Number of ways: ---> ${CountWays(4)}`);
  console.log(`Number of ways: ---> ${CountWays(5)}`);

  /*
    Fibonacci number pattern#
    We can clearly see that this problem follows the Fibonacci number pattern. 
    The only difference is that in Fibonacci numbers every number is a sum of the two preceding numbers, 
    whereas in this problem every count is a sum of three preceding counts. Here is the recursive formula for this problem:

    CountWays(n) = CountWays(n-1) + CountWays(n-2) + CountWays(n-3), for n >=3
    This problem can be extended further. Instead of taking 1, 2, or 3 steps at any time, what if we can take up to ‘k’ steps at any time? In that case, our recursive formula will look like:

    CountWays(n) = CountWays(n-1) + CountWays(n-2) + CountWays(n-3) + ... + CountWays(n-k), for n >= k
  
  
  */