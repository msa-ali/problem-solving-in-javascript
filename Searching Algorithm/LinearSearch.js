const LinearSearch = (arr = [], itemToFind) => {
    for(let i=0; i< arr.length; i++) {
        if(arr[i] === itemToFind) return i;
    }
    return null;
}