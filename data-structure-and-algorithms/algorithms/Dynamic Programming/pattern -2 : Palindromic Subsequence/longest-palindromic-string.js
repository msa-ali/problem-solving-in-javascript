/*
    Given a string, find the length of its Longest Palindromic Substring (LPS). 
    In a palindromic string, elements read the same backward and forward.
*/

const longestPalindromicString = (str = '') => {
    let start = 0, end = str.length - 1;
    const dp = [];
    const recursion = (start, end, length = 0) => {
        if(start > end) return length;
        if(start === end) {
            return length + 1;
        }
        dp[start] = dp[start] || [];
        if(typeof dp[start][end] !== 'undefined') {
            console.log('From Cache...');
            return dp[start][end];
        }
        // console.log(str.substring(start, end+1));
        if(str[start] === str[end]) {
            const remainingLength = end - start - 1;
            const res = recursion(start+1, end-1, 0);
            if(remainingLength === res) {
                dp[start][end] = res;
                return 2 + res;
            }
        }
        const way1 = recursion(start+1, end, 0);
        const way2 = recursion(start, end-1, 0);
        dp[start][end] = Math.max(way1, way2);
        return dp[start][end];
    }
    return recursion(start, end);
};

console.log(`Length of LPS ---> ${longestPalindromicString('abdbca')}`);
console.log(`Length of LPS ---> ${longestPalindromicString('cddpd')}`);
console.log(`Length of LPS ---> ${longestPalindromicString('pqr')}`);


// bottom-up approach
let findLPSLength = function(st) {
    // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
    const dp = Array(st.length)
      .fill(0)
      .map(() => Array(st.length).fill(0));
    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
      dp[i][i] = true;
    }
  
    let maxLength = 1;
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
      for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
        if (st.charAt(startIndex) == st.charAt(endIndex)) {
          // if it's a two character string or if the remaining string is a palindrome too
          if (endIndex - startIndex == 1 || dp[startIndex + 1][endIndex - 1]) {
            dp[startIndex][endIndex] = true;
            maxLength = Math.max(maxLength, endIndex - startIndex + 1);
          }
        }
      }
    }
  
    return maxLength;
  };
  
  console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
  console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
  console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);