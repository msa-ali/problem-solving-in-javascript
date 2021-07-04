/**
 * @param {number[]} nums
 * @return {number}
 * Keep track of prev element and iterate over array with a diff pointer
 * if duplicate encounters, delete from array but keep the index same in this case otherwise
 * if duplicate is not there, set prev to current element and increment the index.
 */
var removeDuplicates = function(nums) {
    let prev;
    let i = 0;
    while(i< nums.length) {
        if(nums[i] === prev) {
            nums.splice(i,1);
        } else {
            prev = nums[i];
            i++;
        }
    }
    return nums.length;
};

// another approach
/*
    need to remove the duplicates in-place such that the resultant length of the array remains sorted. 
    As the input array is sorted, therefore, one way to do this is to shift the elements left whenever we encounter duplicates. 
    In other words, we will keep one pointer for iterating the array and one pointer for placing the next non-duplicate number. 
    So our algorithm will be to iterate the array and whenever we see a non-duplicate number 
    we move it next to the last non-duplicate number we’ve seen.
*/
var removeDuplicates2 = (nums) => {
    let nextNonDuplicate = 1;
    let i = 1;
    while(i < nums.length) {
        if(nums[i] !== nums[nextNonDuplicate -1]) {
            nums[nextNonDuplicate] = nums[i];
            nextNonDuplicate++;
        }
        i++;
    }
  return nextNonDuplicate;
};