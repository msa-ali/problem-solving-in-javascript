/*
    Given two integer arrays to represent weights and profits of ‘N’ items, we need to find a subset 
    of these items which will give us maximum profit such that their cumulative weight is not more than 
    a given number ‘C’. Write a function that returns the maximum profit. 
    Each item can only be selected once, which means either we put an item in the knapsack or skip it.

    Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack that has a capacity ‘C’. 
    The goal is to get the maximum profit from the items in the knapsack. 
    Each item can only be selected once, as we don’t have multiple quantities of any item.

    Let’s take Merry’s example, who wants to carry some fruits in the knapsack to get maximum profit. 
    Here are the weights and profits of the fruits:
    Items: { Apple, Orange, Banana, Melon }
    Weights: { 2, 3, 1, 4 }
    Profits: { 4, 5, 3, 7 }
    Knapsack capacity: 5

    Let’s try to put different combinations of fruits in the knapsack, such that their total weight is not more than 5:
    Apple + Orange (total weight 5) => 9 profit
    Apple + Banana (total weight 3) => 7 profit
    Orange + Banana (total weight 4) => 8 profit
    Banana + Melon (total weight 5) => 10 profit

    This shows that Banana + Melon is the best combination, as it gives us the maximum profit and
     the total weight does not exceed the capacity.
*/

// Top down approach
const solveKnapsackTopDown = function (profits, weights, capacity, currentIndex = 0, cache = []) {
    // base case
    if (capacity <= 0 || currentIndex >= profits.length) {
        return 0;
    }
    // initialize the cache if not there
    cache[currentIndex] = cache[currentIndex] || [];
    // if value is there in cache, return directly instead of recomputing again
    if (typeof cache[currentIndex][capacity] !== 'undefined') {
        return cache[currentIndex][capacity];
    }
    let profit1 = 0;
    if (weights[currentIndex] <= capacity) {
        profit1 = profits[currentIndex] +
            solveKnapsackTopDown(profits, weights, capacity - weights[currentIndex], currentIndex + 1, cache);
    }
    const profit2 = solveKnapsackTopDown(profits, weights, capacity, currentIndex + 1, cache);
    const result = Math.max(profit1, profit2);
    // update the cache
    cache[currentIndex][capacity] = result;
    return result;
};

// Bottom up approach
let solveKnapsackBottomUp = function(profits, weights, capacity) {
    const n = profits.length;
    if (capacity <= 0 || n == 0 || weights.length != n) return 0;
  
    const dp = Array(profits.length)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));
  
    // populate the capacity=0 columns; with '0' capacity we have '0' profit
    for (let i = 0; i < n; i++) dp[i][0] = 0;
  
    // if we have only one weight, we will take it if it is not more than the capacity
    for (let c = 0; c <= capacity; c++) {
      if (weights[0] <= c) dp[0][c] = profits[0];
    }
  
    // process all sub-arrays for all the capacities
    for (let i = 1; i < n; i++) {
      for (let c = 1; c <= capacity; c++) {
        let profit1 = 0,
          profit2 = 0;
        // include the item, if it is not more than the capacity
        if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
        // exclude the item
        profit2 = dp[i - 1][c];
        // take maximum
        dp[i][c] = Math.max(profit1, profit2);
      }
    }
  
    // maximum profit will be at the bottom-right corner.
    return dp[n - 1][capacity];
  };

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsackTopDown(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsackTopDown(profits, weights, 6)}`);

console.log(`Total knapsack profit: ---> ${solveKnapsackBottomUp(profits, weights, 6)}`);