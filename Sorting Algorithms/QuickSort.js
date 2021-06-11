
const quickSort = (arr = [], left, right) => {
    if(left < right) {
        const partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex+1, right);
    }
};

const partition = (arr = [], left, right) => {
    const pivotElement = arr[right];
    let partitionIndex = left;
    for(let j = left; j< right; j++){
        if(arr[j] < pivotElement) {
            swap(arr, partitionIndex, j);
            partitionIndex++;
        }
    }
    swap(arr, partitionIndex, right);
    return partitionIndex;
};

const swap = (arr = [], i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const getKthLargest = (arr = [], k) => {
    const indexToFind = arr.length - k;
    quickSort(arr, 0, arr.length-1);
    return arr[indexToFind];
}

console.log(getKthLargest([3,1,6,99,0,33,56], 2));