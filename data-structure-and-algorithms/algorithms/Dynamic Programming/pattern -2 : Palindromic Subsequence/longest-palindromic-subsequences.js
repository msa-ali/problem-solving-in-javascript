const {performance} = require('perf_hooks');
const longestPalindromicSubsequences = (string = '') => {
    if(string.length === 0) return 0;
    let end = string.length - 1;
    let start = 0;

    const recursion = (str, start, end, length = 0) => {
        if(start > end) {
            return length;
        }
        if(start === end) {
            return length + 1;
        }
        if(str[start] === str[end]) {
            return recursion(str, start + 1, end - 1, length + 2);
        } else {
            const way1 = recursion(str, start + 1, end, length);
            const way2 = recursion(str, start, end - 1, length);
            return Math.max(way1, way2);
        }
    }
    return recursion(string, start, end);
};
let t1 = performance.now();
console.log(longestPalindromicSubsequences('abdbca'));
console.log(longestPalindromicSubsequences('cddpd'));
console.log(longestPalindromicSubsequences('pqr'));
let t2 = performance.now();
console.log('TOTAL EXECUTION TIME: ', t2-t1);

const longestPalindromicSubsequencesTopDown = (string = '') => {
    if(string.length === 0) return 0;
    let end = string.length - 1;
    let start = 0;
    const dp = [];
    const recursion = (str, start, end, length = 0) => {
        if(start > end) {
            return length;
        }
        if(start === end) {
            return length + 1;
        }
        dp[start] = dp[start] || [];
        if(typeof dp[start][end] !== 'undefined') {
            console.log('From Cache...');
            return dp[start][end];
        }
        if(str[start] === str[end]) {
            dp[start][end] = recursion(str, start + 1, end - 1, length + 2);
            return dp[start][end];
        } else {
            const way1 = recursion(str, start + 1, end, length);
            const way2 = recursion(str, start, end - 1, length);
            dp[start][end] = Math.max(way1, way2);
            return dp[start][end];
        }
    }
    return recursion(string, start, end);
};
t1 = performance.now();
console.log(longestPalindromicSubsequencesTopDown('abdbca'));
console.log(longestPalindromicSubsequencesTopDown('cddpd'));
console.log(longestPalindromicSubsequencesTopDown('pqr'));
t2 = performance.now();
console.log('TOTAL EXECUTION TIME: ', t2-t1);

// Bottom Up Approach
let findLPSLength = function(st) {
    // dp[i][j] stores the length of LPS from index 'i' to index 'j'
    var dp = Array(st.length)
      .fill(0)
      .map(() => Array(st.length).fill(0));
  
    // every sequence with one element is a palindrome of length 1
    for (let i = 0; i < st.length; i++) {
      dp[i][i] = 1;
    }
  
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
      for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
        // case 1: elements at the beginning and the end are the same
        if (st.charAt(startIndex) == st.charAt(endIndex)) {
          dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
        } else {
          // case 2: skip one element either from the beginning or the end
          dp[startIndex][endIndex] = Math.max(
            dp[startIndex + 1][endIndex],
            dp[startIndex][endIndex - 1]
          );
        }
      }
    }
    return dp[0][st.length - 1];
  };
  
  console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
  console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
  console.log('Length of LPS ---> ' + findLPSLength('pqr'));

