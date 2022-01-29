import { PriorityQueue } from '../priority-queue';

const find_k_largest_numbers = function (nums, k) {
    const minHeap = new PriorityQueue((a, b) => b > a);

    // put first 'K' numbers in the min heap
    for (i = 0; i < k; i++) {
        minHeap.push(nums[i]);
    }

    // go through the remaining numbers of the array, if the number from the array is bigger than the
    // top(i.e., smallest) number of the min-heap, remove the top number from heap and add the number from array
    for (i = k; i < nums.length; i++) {
        if (nums[i] > minHeap.peek()) {
            minHeap.pop();
            minHeap.push(nums[i]);
        }
    }

    // the heap has the top 'K' numbers, return them in a list
    return minHeap.toArray();
};


console.log(`Here are the top K numbers: ${find_k_largest_numbers([3, 1, 5, 12, 2, 11], 3)}`)
console.log(`Here are the top K numbers: ${find_k_largest_numbers([5, 12, 11, -1, 12], 3)}`)

/*
Given array: [3, 1, 5, 12, 2, 11], and K=3
First, let’s insert ‘K’ elements in the min-heap.
After the insertion, the heap will have three numbers [3, 1, 5] with ‘1’ being the root as it is the smallest element.
We’ll iterate through the remaining numbers and perform the above-mentioned two steps if we find a number larger than the root of the heap.
The 4th number is ‘12’ which is larger than the root (which is ‘1’), so let’s take out ‘1’ and insert ‘12’. Now the heap will have [3, 5, 12] with ‘3’ being the root as it is the smallest element.
The 5th number is ‘2’ which is not bigger than the root of the heap (‘3’), so we can skip this as we already have top three numbers in the heap.
The last number is ‘11’ which is bigger than the root (which is ‘3’), so let’s take out ‘3’ and insert ‘11’. Finally, the heap has the largest three numbers: [5, 12, 11], it will take us 
O(logK) to extract the minimum number from the min-heap. So the overall time complexity of our algorithm will be 
O(K∗logK+(N−K)∗logK) since, first, we insert ‘K’ numbers in the heap and then iterate through the remaining numbers and at every step, in the worst case, we need to extract the minimum number and insert a new number in the heap. This algorithm is better than O(N∗logN).
*/