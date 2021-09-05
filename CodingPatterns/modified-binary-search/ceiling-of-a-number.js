/*
    Given an array of numbers sorted in an ascending order, find the ceiling of a given number ‘key’. 
    The ceiling of the ‘key’ will be the smallest element in the given array greater than or equal to the ‘key’.
    Write a function to return the index of the ceiling of the ‘key’. If there isn’t any ceiling return -1.

    Input: [4, 6, 10], key = 6
    Output: 1
    Explanation: The smallest number greater than or equal to '6' is '6' having index '1'.

    Input: [1, 3, 8, 10, 15], key = 12
    Output: 4
    Explanation: The smallest number greater than or equal to '12' is '15' having index '4'.

    Input: [4, 6, 10], key = 17
    Output: -1
    Explanation: There is no number greater than or equal to '17' in the given array.

    Input: [4, 6, 10], key = -1
    Output: 0
    Explanation: The smallest number greater than or equal to '-1' is '4' having index '0'.
*/
const search_ceiling_of_a_number = function(arr, key) {
    let start = 0, end = arr.length - 1;
    if(arr[arr.length - 1] < key) return -1;
    while(start <= end) {
        const mid = Math.floor(start + (end - start)/ 2);
        if(arr[mid] === key) return mid;
        if(key < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return start;
};
  
  
  console.log(search_ceiling_of_a_number([4, 6, 10], 6))
  console.log(search_ceiling_of_a_number([1, 3, 8, 10, 15], 12))
  console.log(search_ceiling_of_a_number([4, 6, 10], 17))
  console.log(search_ceiling_of_a_number([4, 6, 10], -1))
  