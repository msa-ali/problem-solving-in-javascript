/*
    A generator function is a function that we can start and stop, for an indefinite amount of time. 
    And also restart with the possibility of passing additional data at a later point in time.

    To create a generator, you need to define a generator function. A generator function is defined
    with keyword function* rather than function. When you invoke a generator function, it doesnt actually execute
    the function body but instead it returns a generator object which is an iterator. Calling its next method causes
    the body of the generator function to run from the start (or whatever its current position is) until it
    reaches a yield statement. The value of the yield statements becomes the value returned by the next()
    call on the iterator.

*/

// To create a generator function we write like this:
function* fruitList() {
    yield 'Banana';
    yield 'Apple';
    yield 'Orange';
}

let fruits = fruitList();

fruits;
// Generator
console.log(fruits.next());
// Object { value: "Banana", done: false }
console.log(fruits.next());
// Object { value: "Apple", done: false }
console.log(fruits.next());
// Object { value: "Orange", done: false }
console.log(fruits.next());
// Object { value: undefined, done: true }

// we can use generators like other iterable types
fruits = fruitList();
console.log('\n\nSpreading Generators like array ', [...fruits], '\n\n');


// Looping over an array with a generator 
// create an array of fruits
const fruitArray = ['Banana', 'Apple', 'Orange', 'Melon', 'Cherry', 'Mango'];

// create our looping generator
function* loop(arr) {
    for (const item of arr) {
        yield `I like to eat ${item}s`;
    }
}
const fruitGenerator = loop(fruitArray);
console.log(fruitGenerator.next());
// Object { value: "I like to eat Bananas", done: false }
console.log(fruitGenerator.next());
// Object { value: "I like to eat Apples", done: false }
console.log(fruitGenerator.next().value);
// "I like to eat Oranges"


// Finish the generator with .return()
fruits = fruitList();
console.log(fruits.return());
// Object { value: undefined, done: true }


// Catching errors with .throw()
// As you can see when we called .throw(), the generator returned us the error 
// and finished even though we still had one more yield to execute.
function* gen() {
    try {
        yield "Trying...";
        yield "Trying harder...";
        yield "Trying even harder..";
    }
    catch (err) {
        console.log("Error: " + err);
    }
}

const myGenerator = gen();
console.log(myGenerator.next());
// Object { value: "Trying...", done: false }
console.log(myGenerator.next());
// Object { value: "Trying harder...", done: false }
console.log(myGenerator.throw("ooops"));
// Error: ooops
// Object { value: undefined, done: true }

/*
    Combining Generators with Promises
    ------------------------------------
    Using a generator in combination with a Promise will allow us to write asynchronous code that 
    feels like synchronous code.
    What we want to do is wait for a promise to resolve and then pass the 
    resolved value back into our generator in the .next() call.

*/

var myPromise = () => new Promise((resolve) => {
    resolve("our value is...");
});

function* genPromise() {
    let result = "";
    // returns promise
    yield myPromise().then(data => { result = data });
    // wait for the promise and use its value
    yield result + ' 2';
};

// Call the async function and pass params
const asyncFunc = genPromise();
const val1 = asyncFunc.next();
console.log(val1);
// call the promise and wait for it to resolve
// {value: Promise, done: false}
val1.value.then(() => {
    console.log(asyncFunc.next());
})
  // Object { value: "our value is... 2", done: false }
