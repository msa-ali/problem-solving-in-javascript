
// https://leetcode.com/problems/permutation-in-string/

function checkInclusion(pattern, str) {
    let windowStart = 0,
      matched = 0,
      charFrequency = {};
  
    for (i = 0; i < pattern.length; i++) {
      const chr = pattern[i];
      if (!(chr in charFrequency)) {
        charFrequency[chr] = 0;
      }
      charFrequency[chr] += 1;
    }
      
    for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const rightChar = str[windowEnd];
      if (rightChar in charFrequency) {
        // Decrement the frequency of matched character
        charFrequency[rightChar] -= 1;
        if (charFrequency[rightChar] === 0) {
          matched += 1;
        }
      }
  
      if (matched === Object.keys(charFrequency).length) {
        return true;
      }
  
      // Shrink the sliding window
      if (windowEnd >= pattern.length - 1) {
        leftChar = str[windowStart];
        windowStart += 1;
        if (leftChar in charFrequency) {
          if (charFrequency[leftChar] === 0) {
            matched -= 1;
          }
          charFrequency[leftChar] += 1;
        }
      }
    }
    return false;
  }
  
  
  
  
  
  