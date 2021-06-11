
const insertionSort = (a = []) => {
    const n = a.length;
    for(let i = 1; i< n; i++ ) {
        for(j = i; j>=0; j--) {
            if(a[j] < a[j-1] && j-1 >=0) {
                const temp = a[j];
                a[j] = a[j-1];
                a[j-1] = temp;
            }
        }
    }
    return a;
};

const arr = [51, 42, 45, 1, 98, 3];

