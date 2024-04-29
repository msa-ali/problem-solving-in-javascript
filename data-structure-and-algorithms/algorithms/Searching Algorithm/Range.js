/*
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let indexFound = binarySearch(nums, target, 0, nums.length - 1);
    if (indexFound === -1) return [-1, -1];
    let start = end = indexFound;
    let tempStart, tempEnd;
    while (start !== -1) {
        tempStart = start;
        start = binarySearch(nums, target, 0, start - 1);
    }
    while (end !== -1) {
        tempEnd = end;
        end = binarySearch(nums, target, end + 1, nums.length - 1);
    }
    return [tempStart, tempEnd];
};

const binarySearch = (arr = [], target, start, end) => {
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) return mid;
        else if (target < arr[mid]) end = mid - 1;
        else {
            start = mid + 1;
        }
    }
    return -1;
}