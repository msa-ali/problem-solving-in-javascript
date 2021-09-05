function search_bitonic_array(arr, key) {
    const maxIndex = find_max(arr);
    const keyIndex = binary_search(arr, key, 0, maxIndex);
    if (keyIndex !== -1) {
      return keyIndex;
    }
    return binary_search(arr, key, maxIndex + 1, arr.length - 1);
  }
  
  // find index of the maximum value in a bitonic array
  function find_max(arr) {
    let start = 0,
      end = arr.length - 1;
    while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] > arr[mid + 1]) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
    // at the end of the while loop, 'start === end'
    return start;
  }
  
  
  // order-agnostic binary search
  function binary_search(arr, key, start, end) {
    while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
  
      if (key === arr[mid]) {
        return mid;
      }
  
      if (arr[start] < arr[end]) { // ascending order
        if (key < arr[mid]) {
          end = mid - 1;
        } else { // key > arr[mid]
          start = mid + 1;
        }
      } else { // descending order
        if (key > arr[mid]) {
          end = mid - 1;
        } else { // key < arr[mid]
          start = mid + 1;
        }
      }
    }
    return -1; // element is not found
  }
  
  console.log(search_bitonic_array([1, 3, 8, 4, 3], 4));
  console.log(search_bitonic_array([3, 8, 3, 1], 8));
  console.log(search_bitonic_array([1, 3, 8, 12], 12));
  console.log(search_bitonic_array([10, 9, 8], 10));