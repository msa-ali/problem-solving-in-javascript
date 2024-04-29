/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
    var result = [];
    let left = 0;
    while(nums[left] < 0) left++;
    let negativePointer = left - 1;
    if(left - 1 < 0) {
        return nums.map(num => num * num);
    } else if(left === nums.length) {
        while(negativePointer >= 0) {
        const val1 = Math.pow(nums[negativePointer], 2);
        result.push(val1);
        negativePointer--;
    }
        return result;
    }
    while(negativePointer >= 0 && left < nums.length) {
        const val1 = Math.pow(nums[negativePointer], 2);
        const val2 = Math.pow(nums[left], 2);
        if(val1 <= val2) {
            result.push(val1);
            negativePointer--;
        } else {
            result.push(val2);
            left++;
        }
    }
    while(negativePointer >= 0) {
        const val1 = Math.pow(nums[negativePointer], 2);
        result.push(val1);
        negativePointer--;
    }
    
    while(left < nums.length) {
        const val2 = Math.pow(nums[left], 2);
        result.push(val2);
        left++;
    }
     return result;   
};

function make_squares(arr) {
    const n = arr.length;
    squares = Array(n).fill(0);
    let highestSquareIdx = n - 1;
    let left = 0,
      right = n - 1;
    while (left <= right) {
      let leftSquare = arr[left] * arr[left],
        rightSquare = arr[right] * arr[right];
      if (leftSquare > rightSquare) {
        squares[highestSquareIdx] = leftSquare;
        left += 1;
      } else {
        squares[highestSquareIdx] = rightSquare;
        right -= 1;
      }
      highestSquareIdx -= 1;
    }
  
    return squares;
  }