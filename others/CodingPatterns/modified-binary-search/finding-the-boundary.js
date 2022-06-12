/*
    An array of boolean values is divided into two sections: the left section consists of all false, and the right section consists of all true. Find the boundary of the right section, i.e. the index of the first true element. If there is no true element, return -1.

    Example#
    Input: arr = [false, false, true, true, true]

    Output: 2

    Explanation: first true's index is 2.




*/


function find_boundary1(arr) {
    let start = 0, end = arr.length - 1;
    while(start <= end) {
        const mid = Math.floor(start + (end - start)/2);
        if(arr[mid] === false) {
            start = mid + 1;
        } else {
            if(mid - 1 >= 0 && arr[mid-1] === true){
                end = mid - 1;
            } else {
                return mid;
            }
        }
    }
    return -1
}

function find_boundary(arr) {
    let left = 0;
    let right = arr.length - 1;
    let boundary_index = -1;

    while (left <= right) {
        let mid = Math.trunc((left + right) / 2);
        if (arr[mid]) {
            boundary_index = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return boundary_index;
}

//Driver code
console.log("Find Boundary :",find_boundary([false, false, true, true, true]))
console.log("Find Boundary :",find_boundary([true]))
console.log("Find Boundary :",find_boundary([false, false, false]));
console.log("Find Boundary :",find_boundary([true, true, true, true, true]))
console.log("Find Boundary :",find_boundary([false, true]))

/*
The binary decisions we have to make when we look at an element are:
If the element is false, we discard everything to the left and the current element itself.
If the element is true, the current element could be the first that is true and there may be other true elements to the left. 
We discard everything to the right, but what about the current element?
We can either keep the current element in the range or record it somewhere and then discard it. Here we choose the latter. 
We’ll discuss the other approach in the alternative solution section.
We keep a variable boundary_index that represents the leftmost true's index currently recorded. 
If the current element is true, we update boundary_index with its index and 
discard everything to the right including the current element itself since its index has been recorded by the variable.
*/