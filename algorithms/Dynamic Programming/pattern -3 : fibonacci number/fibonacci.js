const calculateFibonacciTopDown = function(n) {
    const dp = [];
    const fib = (n) => {
        if (n <= 1) return n;
        if(dp[n]) {
            return dp[n];
        }
        dp[n] = fib(n-1) + fib(n-2);
        return dp[n];
    }
    return fib(n);
  };

  const calculateFibonacciBottomUp = function(n) {
    const dp = [];
    dp[0] = 0;
    dp[1] = 1;
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
  };
  console.log(`5th Fibonacci is ---> ${calculateFibonacciTopDown(5)}`);
  console.log(`6th Fibonacci is ---> ${calculateFibonacciTopDown(6)}`);
  console.log(`7th Fibonacci is ---> ${calculateFibonacciTopDown(7)}`);

  console.log(`5th Fibonacci is ---> ${calculateFibonacciBottomUp(5)}`);
  console.log(`6th Fibonacci is ---> ${calculateFibonacciBottomUp(6)}`);
  console.log(`7th Fibonacci is ---> ${calculateFibonacciBottomUp(7)}`);