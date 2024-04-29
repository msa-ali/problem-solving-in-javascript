const find_max_in_bitonic_array = function(arr = []) {
    let start = 0, end = arr.length - 1;
    while(start < end) {
        const mid = Math.floor(start + (end - start)/2);
        const middleElement = arr[mid];
        if(middleElement > arr[mid - 1] && middleElement > arr[mid + 1]) {
            return middleElement;
        }
        else if(arr[mid-1] > middleElement) {
            end = mid - 1;
        } else if(arr[mid + 1] >= middleElement) {
            start = mid + 1;
        }
    }
    return arr[end];
};

function find_max_in_bitonic_array2(arr) {
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
      mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] > arr[mid + 1]) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
  
    // at the end of the while loop, 'start === end'
    return arr[start];
  }
  
  
  console.log(find_max_in_bitonic_array([1, 3, 8, 12, 4, 2]))
  console.log(find_max_in_bitonic_array([3, 8, 3, 1]))
  console.log(find_max_in_bitonic_array([1, 3, 8, 12]))
  console.log(find_max_in_bitonic_array([10, 9, 8]))