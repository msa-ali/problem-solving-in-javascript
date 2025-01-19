/*
    Suppose our application is using an external library to access setTimeOut function which is buggy.
    You need to use this buggy setTimeOut without affecting it output.
*/
import { PriorityQueue } from "../data-structures/priority-queue";

let timerId;
const mySetTimeout = (callback, wait) => {
    if (timerId !== undefined) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(callback, wait);
}

const queue = new PriorityQueue((a, b) => a.wait < b.wait);
let isProcessing = false;
let timeElapsed = 0;

const processQueue = () => {
    if (queue.isEmpty()) {
        isProcessing = false;
        return;
    }

    isProcessing = true;
    let {callback, wait} = queue.pop();

    if (timeElapsed > 0) {
        wait = wait < timeElapsed ? 0 : wait - timeElapsed;
    }

    console.log('wait =', wait);
    console.log('timeElapsed =', timeElapsed);

    mySetTimeout(() => {
        callback();
        timeElapsed += wait;
        processQueue();
    }, wait);
}

const updatedSetTimeout = (callback, wait) => {
    queue.push({callback, wait});
    if (!isProcessing) {
        processQueue();
    }
}

updatedSetTimeout(() => {
    console.log('Hello 1');
}, 1000);

updatedSetTimeout(() => {
    console.log('Hello 2');
}, 2000);

updatedSetTimeout(() => {
    console.log('Hello 3');
}, 1000);

updatedSetTimeout(() => {
    console.log('Hello 4');
}, 5000);

updatedSetTimeout(() => {
    console.log('Hello 5');
}, 2000);

updatedSetTimeout(() => {
    console.log('Hello 6');
}, 3000);