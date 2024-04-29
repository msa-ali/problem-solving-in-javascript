/*
    Given a string, we want to cut it into pieces such that each piece is a palindrome. 
    Write a function to return the minimum number of cuts needed.

    Example 1:
    Input: "abdbca"
    Output: 3
    Explanation: Palindrome pieces are "a", "bdb", "c", "a".

    Example 2:
    Input: = "cddpd"
    Output: 2
    Explanation: Palindrome pieces are "c", "d", "dpd".

    Example 3:
    Input: = "pqr"
    Output: 2
    Explanation: Palindrome pieces are "p", "q", "r".

    Example 4:
    Input: = "pp"
    Output: 0
    Explanation: We do not need to cut, as "pp" is a palindrome.
*/

const findMPPCuts = function(st) {
    debugger;
    const dp = [];
    const dpIsPalindrome = [];
  
    function findMPPCutsRecursive(st, startIndex, endIndex) {
      // we don't need to cut the string if it is a palindrome
      if (startIndex >= endIndex || isPalindrome(st, startIndex, endIndex)) {
        return 0;
      }
  
      // at max, we need to cut the string into its 'length-1' pieces
      let minimumCuts = endIndex - startIndex;
      for (let i = startIndex; i <= endIndex; i++) {
        if (isPalindrome(st, startIndex, i)) {
          // we can cut here as we have a palindrome from 'startIndex' to 'i'
          minimumCuts = Math.min(minimumCuts, 1 + findMPPCutsRecursive(st, i + 1, endIndex));
        }
      }
      return minimumCuts;
    }
  
    function isPalindrome(st, x, y) {
      dpIsPalindrome[x] = dpIsPalindrome[x] || [];
      if (typeof dpIsPalindrome[x][y] === 'undefined') {
        dpIsPalindrome[x][y] = true;
        let i = x,
          j = y;
        while (i <= j) {
          if (st[i++] != st[j--]) {
            dpIsPalindrome[x][y] = false;
            break;
          }
          // use memoization to find if the remaining string is a palindrome
          dpIsPalindrome[i] = dpIsPalindrome[i] || [];
          if (i < j && typeof dpIsPalindrome[i][j] !== 'undefined') {
            dpIsPalindrome[x][y] = dpIsPalindrome[i][j];
            break;
          }
        }
      }
      return dpIsPalindrome[x][y];
    }
  
    return findMPPCutsRecursive(st, 0, st.length - 1);
  };
  
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
//   console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
//   console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
//   console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);