/*
    Given an array of numbers sorted in ascending order, find the range of a given number ‘key’. The range of the ‘key’ will be the first and last position of the ‘key’ in the array.

    Write a function to return the range of the ‘key’. If the ‘key’ is not present return [-1, -1].

    Example 1:
    Input: [4, 6, 6, 6, 9], key = 6
    Output: [1, 3]

    Example 2:
    Input: [1, 3, 8, 10, 15], key = 10
    Output: [3, 3]

    Example 3:
    Input: [1, 3, 8, 10, 15], key = 12
    Output: [-1, -1]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange = function(nums, target) {
    let indexFound = binarySearch(nums, target, 0, nums.length -1);
    if(indexFound === -1) return [-1, -1];
    let start = end = indexFound;
    let tempStart, tempEnd;
    while(start !== -1) {
        tempStart = start;
        start = binarySearch(nums, target, 0, start -1);
    }
    while(end !== -1) {
        tempEnd = end;
        end = binarySearch(nums, target, end+1, nums.length -1);
    }
    return [tempStart, tempEnd];
};

const binarySearch = (arr = [], target, start, end) => {   
    while(start <= end) {
        const mid = Math.floor((start + end)/2);
        if(arr[mid] === target ) return mid;
        else if(target < arr[mid]) end = mid - 1;
        else {
            start = mid + 1;
        }
    }
    return -1;
}

/**
 * Approach 2
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange2 = function(nums, target) {
    const firstIndex = nums.findIndex(num => num === target);
    if(firstIndex === -1) return [-1, -1];
    let temp = firstIndex+1;
    while(temp < nums.length && nums[temp] === target) temp++;
    return [firstIndex, temp-1];
};

console.log(searchRange([4, 6, 6, 6, 9], 6))
console.log(searchRange([1, 3, 8, 10, 15], 10))
console.log(searchRange([1, 3, 8, 10, 15], 12))