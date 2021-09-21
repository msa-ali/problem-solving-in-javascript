let solveKnapsack = function (profits, weights, capacity) {
    if (!weights.length || !profits.length || weights.length !== profits.length) {
        return 0;
    }
    const recurse = (currIndex, capacity, profit = 0) => {
        if (currIndex >= profits.length || capacity <= 0) {
            return profit;
        }
        let profit1 = 0, profit2 = 0;
        if (weights[currIndex] <= capacity) {
            profit1 = recurse(currIndex, capacity - weights[currIndex], profit + profits[currIndex]);
        }
        profit2 = recurse(currIndex + 1, capacity, profit)
        return Math.max(profit1, profit2);
    }
    return recurse(0, capacity, 0);
};

let solveKnapsackTopDown = function (profits, weights, capacity) {
    const dp = [];

    function knapsackRecursive(profits, weights, capacity, currentIndex) {
        // base checks
        if (
            capacity <= 0 ||
            profits.length == 0 ||
            weights.length != profits.length ||
            currentIndex >= profits.length
        ) {
            return 0;
        }

        dp[currentIndex] = dp[currentIndex] || [];
        // check if we have not already processed a similar sub-problem
        if (typeof dp[currentIndex][capacity] !== 'undefined') return dp[currentIndex][capacity];

        // recursive call after choosing the items at the currentIndex, note that we recursive call on all
        // items as we did not increment currentIndex
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 =
                profits[currentIndex] +
                knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);
        return dp[currentIndex][capacity];
    }

    return knapsackRecursive(profits, weights, capacity, 0);
};

var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

let solveKnapsackBottomUp = function(profits, weights, capacity) {
    // base checks
    if (capacity <= 0 || profits.length == 0 || weights.length != profits.length) return 0;
  
    const n = profits.length;
    const dp = Array(profits.length)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));
  
    // populate the capacity=0 columns
    for (let i = 0; i < n; i++) dp[i][0] = 0;
  
    // process all sub-arrays for all capacities
    for (let i = 0; i < n; i++) {
      for (let c = 1; c <= capacity; c++) {
        let profit1 = 0,
          profit2 = 0;
        if (weights[i] <= c) profit1 = profits[i] + dp[i][c - weights[i]];
        if (i > 0) profit2 = dp[i - 1][c];
        dp[i][c] = profit1 > profit2 ? profit1 : profit2;
      }
    }
  
    // maximum profit will be in the bottom-right corner.
    return dp[n - 1][capacity];
};
  
  var profits = [15, 50, 60, 90];
  var weights = [1, 3, 4, 5];
  console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
  console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);
  
