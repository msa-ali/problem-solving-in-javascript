/*
    Given a string, find the minimum number of characters that we can remove to make it a palindrome.

    Example 1:
    Input: "abdbca"
    Output: 1
    Explanation: By removing "c", we get a palindrome "abdba".

    Example 2:
    Input: = "cddpd"
    Output: 2
    Explanation: Deleting "cp", we get a palindrome "ddd".

    Example 3:
    Input: = "pqr"
    Output: 2
    Explanation: We have to remove any two characters to get a palindrome, e.g. if we 
    remove "pq", we get palindrome "r".

*/

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

const min_deletion_to_make_palindrome = (str = '') => {
    return str.length - longestPalindromicSubsequencesTopDown(str);
}

console.log(min_deletion_to_make_palindrome("abdbca"));

console.log(min_deletion_to_make_palindrome("cddpd"));

console.log(min_deletion_to_make_palindrome("pqr"));


/*
Similar problems#
Here are a couple of similar problems:

1. Minimum insertions in a string to make it a palindrome

Will the above approach work if we make insertions instead of deletions?

Yes, the length of the Longest Palindromic Subsequence is the best palindromic subsequence we can have. Let’s take a few examples:

Example 1:

Input: "abdbca"   
Output: 1  
Explanation: By inserting “c”, we get a palindrome “acbdbca”.

Example 2:

Input: = "cddpd"  
Output: 2  
Explanation: Inserting “cp”, we get a palindrome “cdpdpdc”. We can also get a palindrome by inserting “dc”: “cddpddc”

Example 3:

Input: = "pqr"  
Output: 2  
Explanation: We have to insert any two characters to get a palindrome (e.g. if we insert “pq”, we get a palindrome “pqrqp”).

2. Find if a string is K-Palindromic#

Any string will be called K-palindromic if it can be transformed into a palindrome by removing at most ‘K’ characters from it.

This problem can easily be converted to our base problem of finding the minimum deletions in a string to make it a palindrome. If the “minimum deletion count” is not more than ‘K’, the string will be K-Palindromic.

*/
