/**
 Given a string, find the length of the longest substring in it with no more than K distinct characters.
 You can assume that K is less than or equal to the length of the given string.

 Input: String="araaci", K=2
 Output: 4
 Explanation: The longest substring with no more than '2' distinct characters is "araa".

 Input: String="cbbebi", K=3
 Output: 5
 Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".

 Input: String="araaci", K=1
 Output: 2
 Explanation: The longest substring with no more than '1' distinct characters is "aa".
 */

 const longest_substring_with_k_distinct = function(str, k) {
    if(!str) return 0;
  
    let start = end = 0;
  
    let max = Number.NEGATIVE_INFINITY;
  
    for(end = 0; end < str.length; end++) {
      const substring = str.slice(start, end+1);
      const numOfDistinctChars = new Set(substring).size;
      if(numOfDistinctChars <= k) {
        max = Math.max(max, substring.length);
      } else {
        start++;
      }
    }
  
    return max;
};

// // cbbebi k = 3

// start end substring numOfDistinctChars    max
// 0      0    c        1                     1
// 0      1    cb       2                     2
// 0      2    cbb      2                     3
// 0      3    cbbe     3                     4
// 0      4    cbbeb    3                     5
// 0      5    cbbebi   4 > k                 5


// // araaci k = 1

// start end substring numOfDistinctChars    max
// 0      0    a        1                     1
// 0      1    ar       2 > k                 1
// 1      2    ra       2 > k                 1
// 2      3    aa       1                     2
// 2      4    aac      2 > k                 2
// 3      5    aci      3 > k                 2

// // araaci k = 2

// start end substring numOfDistinctChars    max
// 0      0    a        1                     1
// 0      1    ar       2                     2
// 0      2    ara      2                     3
// 0      3    araa     2                     4
// 0      4    araac    3 > k                 4
// 1      5    raaci    4 > k                 4


function longest_substring_with_k_distinct1(str, k) {
  let windowStart = 0,
    maxLength = 0,
    charFrequency = {};

  // in the following loop we'll try to extend the range [window_start, window_end]
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (!(rightChar in charFrequency)) {
      charFrequency[rightChar] = 0;
    }
    charFrequency[rightChar] += 1;
    // shrink the sliding window, until we are left with 'k' distinct characters in the char_frequency
    while (Object.keys(charFrequency).length > k) {
      const leftChar = str[windowStart];
      charFrequency[leftChar] -= 1;
      if (charFrequency[leftChar] === 0) {
        delete charFrequency[leftChar];
      }
      windowStart += 1; // shrink the window
    }
    // remember the maximum length so far
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}


console.log(`Length of the longest substring: ${longest_substring_with_k_distinct('araaci', 2)}`);
console.log(`Length of the longest substring: ${longest_substring_with_k_distinct('araaci', 1)}`);
console.log(`Length of the longest substring: ${longest_substring_with_k_distinct('cbbebi', 3)}`);