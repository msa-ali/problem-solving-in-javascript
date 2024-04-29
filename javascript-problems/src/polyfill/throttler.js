/*
    Implement a throttler that executes an array of tasks. When the throttler is passed a number, 
    only execute that number of tasks and passes other tasks into a queue. 
*/

function throttle(tasks = [], limit) {
    const queue = [];
    let concurrency = 0;

    const done = () => {
        concurrency--;
        runTasksInQueue();
    }

    const runTasksInQueue = () => {
        while (queue.length && concurrency <= limit) {
            const task = queue.shift();
            console.log('running task from queue');
            runTask(task);
        }
    }

    const runTask = (task) => {
        if (typeof task === 'function') {
            concurrency++;
            setTimeout(task.bind(null, done), 0);
        }
    }

    for (const task of tasks) {
        if (concurrency >= limit) {
            console.log('pushing ', task, ' to queue');
            queue.push(task);
        } else {
            runTask(task);
        }
    }
}

const logger = (msg) => (done) => {
    console.log('-----------');
    console.log(msg);
    console.log('-----------');
    done && done();
};

throttle([logger('1'), logger('2'), logger('3'), logger('4')], 2);