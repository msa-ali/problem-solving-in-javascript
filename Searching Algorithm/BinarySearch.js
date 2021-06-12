

const BinarySearch = (sortedArray = [], itemToFind) => {
    let left = 0, right = sortedArray.length-1;
    while(left <= right) {
        const mid = Math.floor(left+right/2);
        const foundValue = sortedArray[mid];
        if( foundValue === itemToFind) return mid;
        else if(foundValue < itemToFind){
            left += mid+1;
        }else {
            right += mid-1;
        }
    }
    return -1;
};
const arr = [1,2,3,4,6,7,9];
console.log(BinarySearch(arr,0, arr.length, 7 ));