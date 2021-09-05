/*
    Given an array of numbers sorted in ascending order, 
    find the element in the array that has the minimum difference with the given ‘key’.

    Example 1:

    Input: [4, 6, 10], key = 7
    Output: 6
    Explanation: The difference between the key '7' and '6' is minimum than any other number in the array 
    Example 2:

    Input: [4, 6, 10], key = 4
    Output: 4
    Example 3:

    Input: [1, 3, 8, 10, 15], key = 12
    Output: 10
    Example 4:

    Input: [4, 6, 10], key = 17
    Output: 10


4 + 
*/

const search_min_diff_element = function(arr, key) {
    let start = 0, end = arr.length - 1;
    if(key > arr[end]) return arr[end];
    if(key < arr[start]) return arr[start];
    while(start <= end) {
        const mid = Math.floor(start + (end-start)/2);
        if(key === arr[mid]) return arr[mid];
        if(key < arr[mid]) end = mid - 1;
        else start = mid + 1;
    }
    if(arr[start] - key < key - arr[end]) return arr[start];
    return arr[end];
  };
  
  
  console.log(search_min_diff_element([4, 6, 10], 7))
  console.log(search_min_diff_element([4, 6, 10], 4))
  console.log(search_min_diff_element([1, 3, 8, 10, 15], 12))
  console.log(search_min_diff_element([4, 6, 10], 17))