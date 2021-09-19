const countPalindromicSubstring = (str = '') => {
    if(str.length <= 1) {
        return str;
    }
    let start = 0, end = str.length - 1;

    const dp = [];

    const result = [];

    const recursion = (start, end) => {
        if(start > end) {
            return result;
        }
        dp[start] = dp[start] || [];

        if(typeof dp[start][end] !== 'undefined') {
            return dp[start][end];
        }

        if(start === end) {
            const remainingLength = end - start - 1;
            const res = recursion(start + 1, end - 1);
            if(res === remainingLength) {
                dp[start][end] = res + 2;
                result.push(str.substring(start, end + 1));
                return dp[start][end];
            }
        } 
        const way1 = recursion(start + 1, end);
        const way2 = recursion(start, end - 1);
        dp[start][end] = Math.max(way1, way2);
        return dp[start][end];
    }

    recursion(start, end);

    return result;
};

let findCPS = function(st) {
    // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
    var dp = Array(st.length)
      .fill(false)
      .map(() => Array(st.length).fill(false));
  
    let count = 0;
  
    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
      dp[i][i] = true;
      count++;
    }
  
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
      for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
        if (st.charAt(startIndex) == st.charAt(endIndex)) {
          // if it's a two character string or if the remaining string is a palindrome too
          if (endIndex - startIndex == 1 || dp[startIndex + 1][endIndex - 1]) {
            dp[startIndex][endIndex] = true;
            count++;
          }
        }
      }
    }
  
    return count;
  };
  
  console.log('Length of LPS: ---> ' + findCPS('abdbca'));
  console.log('Length of LPS: ---> ' + findCPS('cddpd'));
  console.log('Length of LPS: ---> ' + findCPS('pqr'));

// console.log('Length of LPS: ---> ' , countPalindromicSubstring('abdbca'));
// console.log('Length of LPS: ---> ' ,countPalindromicSubstring('cddpd'));
// console.log('Length of LPS: ---> ' , countPalindromicSubstring('pqr'));