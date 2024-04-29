/** 
 * Divide and Conquer
 * O(nlogn)
 * 
 */

const mergeSort = (a = []) => {
    if(a.length < 2) return a;
    const mid = Math.floor(a.length/2);
    const left = a.slice(0, mid);
    const right = a.slice(mid);
    console.log('\nInput', a);
    console.log('\nleft: ', left);
    console.log('\nright: ', right);
    return merge(
        a,
        mergeSort(left),
        mergeSort(right),
    );
}

const merge = (a = [], left = [], right = []) => {
    let i = j = k = 0;
    while(i < left.length && j < right.length) {
        if(left[i] <= right[j]) {
            a[k] = left[i];
            i++;
        } else {
            a[k] = right[j];
            j++;
        }
        k++;
    }

    while(i < left.length) {
        a[k] = left[i];
        i++;
        k++;
    }

    while(j < right.length) {
        a[k] = right[j];
        j++;
        k++;
    }
    console.log('\nMerged Sub Array', a);
    return a;
}
const a = [51,42,45,1,98,3];
console.log(mergeSort(a));
console.log(a);