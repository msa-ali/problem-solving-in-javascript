/*
    A basic brute-force solution could be to try all substrings of ‘s1’ and ‘s2’ to find the longest common one. 
    We can start matching both the strings one character at a time, so we have two options at any step:

    If the strings have a matching character, we can recursively match for the remaining lengths and keep a track of the current matching length.
    If the strings don’t match, we start two new recursive calls by skipping one character separately from each string and reset the matching length.
    The length of the Longest Common Substring (LCS) will be the maximum number returned by the three recurse calls in the above two options.
 */


const findLCSLength = function (s1 = '', s2 = '') {
    const dp = [];
    const recurse = (index1, index2, length) => {
        if (index1 > s1.length - 1 || index2 > s2.length - 1) return length;
        dp[index1] = dp[index1] || [];
        dp[index1][index2] = dp[index1][index2] || [];
        if (dp[index1][index2][length]) {
            return dp[index1][index2][length];
        }
        let c1 = length;
        if (s1[index1] === s2[index2]) {
            c1 = recurse(index1 + 1, index2 + 1, length + 1);
        }
        const way1 = recurse(index1, index2 + 1, 0);
        const way2 = recurse(index1 + 1, index2, 0);
        dp[index1][index2][length] = Math.max(c1, Math.max(way1, way2));
        return dp[index1][index2][length];

    };
    return recurse(0, 0, 0);
};

const findLCSLengthBottomUp = (s1 = '', s2 = '') => {
    const dp = Array(s1.length + 1)
        .fill(0)
        .map(val => Array(s2.length + 1).fill(0));
    let maxLength = 0;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                maxLength = Math.max(maxLength, dp[i][j]);
            }
        }
    }
    return maxLength;
}

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);