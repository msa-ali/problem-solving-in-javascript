/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
    Note that it is the kth largest element in the sorted order, not the kth distinct element.

    Example 1:

    Input: nums = [3,2,1,5,6,4], k = 2
    Output: 5
    Example 2:

    Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
    Output: 4
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
    const kthLargestIndex = nums.length - k;
     quickSelect(nums, 0, nums.length-1, kthLargestIndex);
    return nums[kthLargestIndex];
};

const quickSelect = (arr = [], left, right, k) => {
    if(left < right) {
        const partitionIndex = partition(arr, left, right);
        if(partitionIndex === k) return arr[partitionIndex];
        else if(k < partitionIndex) {
            return quickSelect(arr, left, partitionIndex - 1, k);
        } else {
            return quickSelect(arr, partitionIndex + 1, right , k);
        }
    }
}

const partition = (arr = [], left, right) => {
    let pivotElement = arr[right];
    let partitionIndex = left;
    for(let j = left; j< right; j++) {
        if(arr[j] < pivotElement) {
            swap(arr, j, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, partitionIndex, right);
    return partitionIndex;
}

const swap = (arr = [], i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}