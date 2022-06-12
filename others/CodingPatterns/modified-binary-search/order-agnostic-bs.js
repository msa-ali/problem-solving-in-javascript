/*
First, we will find the middle of start and end. 
An easy way to find the middle would be:  middle=(start+end)/2. 
For Java and C++, this equation will work for most cases, but when start or end is large, 
this equation will give us the wrong result due to integer overflow. 
Imagine that end is equal to the maximum range of an integer (e.g. for Java: int end = Integer.MAX_VALUE). 
Now adding any positive number to end will result in an integer overflow. 
Since we need to add both the numbers first to evaluate our equation, an overflow might occur. 
The safest way to find the middle of two numbers without getting an overflow is as follows:
     middle  = start + (end-start)/2

*/


function binary_search(arr, key) {
    let start = 0;
    end = arr.length - 1;
    isAscending = arr[start] < arr[end];
    while (start <= end) {
      // calculate the middle of the current range
      mid = Math.floor(start + (end - start) / 2);
  
      if (key === arr[mid]) {
        return mid;
      }
      if (isAscending) { // ascending order
        if (key < arr[mid]) {
          end = mid - 1; // the 'key' can be in the first half
        } else { // key > arr[mid]
          start = mid + 1; // the 'key' can be in the second half
        }
      } else { // descending order
        if (key > arr[mid]) {
          end = mid - 1; // the 'key' can be in the first half
        } else { // key < arr[mid]
          start = mid + 1; // the 'key' can be in the second half
        }
      }
    }
  
    return -1; // element not found
  }
  
  
  console.log(binary_search([4, 6, 10], 10));
  console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5));
  console.log(binary_search([10, 6, 4], 10));
  console.log(binary_search([10, 6, 4], 4));