// Set is a group of definite, distinct objects.
// Set is a group of unordered unique elements.

// In JS, Set is natively supported: const set = new Set();

/**
 * Set Operations
 * Insertion: set.add(1); Time Complexity: O(1)
 * Deletion: set.delete(1); Time Complexity: O(1)
 * Contains: set.has(1); Time Complexity: O(1)
 */

/** Intersection: common elements b/w two sets */
const intersection = (set1 = new Set(), set2 = new Set()) => {
    const intersectionSet = new Set();
    for (let val of set1){
        if(set2.has(val)) {
            intersectionSet.add(val);
        }
    }
    return intersectionSet;
}

/** Is Super Set: A set is a superset of another set, if it containts all elements of other set */
const IsSuperset = (setA = new Set(), subset = new Set()) => {
    for(let val of subset) {
        if(!setA.has(val)){
            return false;
        }
    }
    return true;
}

/**
 * Union: combines elements of two sets
 */
 const unionSet = (set1 = new Set(), set2 = new Set()) => {
    const unionSet = new Set(set1);
    for (let val of set2){
        unionSet.add(val);
    }
    return unionSet;
}

/**
 * Difference : The difference of set A from set B 
 * is all of the elements in set A that are not in set B.
 */
const differenceSet = (set1 = new Set(), set2 = new Set()) => {
    const differenceSet = new Set(set1);
    for(let val of set2) {
        differenceSet.delete(val);
    }
    return differenceSet;
}
/**
 * Check array is having duplicates or not
 * @param {Array} arr 
 * @returns boolean true if array is having duplicates
 */
const checkArrayHavingDuplicates = (arr = []) => {
    const set = new Set(arr);
    return set.size !== arr.length;
}

/**
 * Return Unique values from separate arrays
 * 
 */
const uniqueList = (arr1 = [], arr2 = []) => {
    const set = new Set([...arr1, ...arr2]);
    return Array.from(set);
};