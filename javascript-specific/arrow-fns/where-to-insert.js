// Given an unsorted array of numbers and another number, 
// you are required to find the index at which the number would be placed 
// if it were to be inserted in a sorted version of the array of numbers.

// ([5,4,1,3],2) ===> 1

const getIndex = (arr, number) =>
    arr.reduce((counter, curr) => (number > curr ? ++counter : counter), 0);

var inputsA = [[10,5,1,3],[16,4,5]];
var inputsB = [2,13]
console.log(getIndex(inputsA[0],inputsB[0]))