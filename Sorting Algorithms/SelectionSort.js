/** 
 * Find local min and replace with first element
 */

const selectionSort = (arr = []) => {
    for(let i = 0; i< arr.length; i++) {
        let min = i;
        for(let j = i + 1; j< arr.length; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        const temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    return arr;
};