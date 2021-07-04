/**
 * Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.
 * Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.
 */

//  Input: [1, 2, 3, 4, 6], target=6
//  Output: [1, 3]
//  Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6

// We can follow the Two Pointers approach. 
// We will start with one pointer pointing to the beginning of the array and another pointing at the end. 
// At every step, we will see if the numbers pointed by the two pointers add up to the target sum. 
// If they do, we have found our pair; otherwise, we will do one of two things:
// If the sum of the two numbers pointed by the two pointers is greater than the target sum, this means that we need a pair with a smaller sum. So, to try more pairs, we can decrement the end-pointer.
// If the sum of the two numbers pointed by the two pointers is smaller than the target sum, this means that we need a pair with a larger sum. So, to try more pairs, we can increment the start-pointer.


const pair_with_targetsum = function(nums, target) {
    let left = 0, right = nums.length - 1;
      while(left < right) {
          const sum = nums[left] + nums[right];
          if(sum === target) return [left, right];
          if(sum > target) right -= 1;
          if(sum < target) left += 1;
      }
    return [-1, -1];
  }

// Alternate Solution

/* 
Instead of using a two-pointer, we can utilize a HashTable to search for the required pair. 
We can iterate through the array one number at a time. 
Let’s say during our iteration we are at number ‘X’, so we need to find ‘Y’ such that X+Y==Target
We will do two things here:
Search for ‘Y’ (which is equivalent to Target−X) in the HashTable. 
If it is there, we have found the required pair.
Otherwise, insert “X” in the HashTable, so that we can search it for the later numbers.
*/

var twoSum = (nums, target) => {
    const map = new Map();
    for(let i=0; i< nums.length; i++) {
        const diff = target - nums[i];
        if(!map.has(diff)) {
            map.set(nums[i], i);
        } else {
            return [map.get(diff), i];
        }
    }
  };