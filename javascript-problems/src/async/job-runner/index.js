// A --|
//     |-- D --|
// B --|       |-- E
//             |
// C ----------|

// Each node is a async job, illustrated by setTimeout.
// A, B, and C can run at the same time.
// D, needs to wait for A and B to be done.
// E needs to wait for C and D to be done.
// Implement an interface, let's call it runTasks to take care of this for us.


// A, make X API call
// B, make X API call
// C, make X API call
// D, make X API call
// E, make X API call


// function jobA() {
//     // API call here
//     // setTimeout(() => {

//     // }, 1000);
// }
// D -> dependencies: ['A', 'B']


// function runTasks(tasks, allDoneCallback) {

// }

// const tasks = //?? TODO

// runTasks(tasks, () => {
//     console.log('All done!')
// })
/**
 * Class representing a Task
 */
class Task {
    #id;
    #callback;
    /**
     * @type {string[]}
     */
    #dependencies;
    /**
     * @type {'NOT_STARTED' |'INQUEUE' | 'INPROGRESS' | 'COMPLETED' | 'FAILED' | 'DEPENDENCY_FAILED'}
     */
    #status;
    /**
     * @type {{result: any, error?: any}}
     */
    #result;
    #subscribers;

    /**
     * Create a Task
     * @param {string} id 
     * @param {(onSuccess?: (result?: any) => void, onFailure?: (error?: any) => void)} callback 
     * @param {Task[]} dependencies
     */
    constructor(id, callback) {
        this.#id = id;
        this.#callback = callback;
        this.#status = 'NOT_STARTED';
        this.#dependencies = [];
        this.#result = { error: null, result: undefined }
        this.#subscribers = new Set();
    }

    /**
     * 
     * @param {(result?: any) => void} onCompleted,
     * @param {(error?: any) => void} onFailure 
     */
    run() {
        this.#status = 'INPROGRESS';
        this.#callback.apply(null, [
            this.#onSuccess.bind(this),
            this.#onFailure.bind(this)
        ]);
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
    }

    unsubscribe(callback) {
        this.#subscribers.delete(callback);
    }

    get id() {
        return this.#id;
    }

    get dependencies() {
        return this.#dependencies
    }
    /**
     * @param{Task[]} deps
     */
    set dependencies(deps) {
        this.#dependencies = Object.freeze(deps.map(dependency => dependency.id));
    }

    get result() {
        return this.#result;
    }

    get status() {
        return this.#status;
    }
    /**
     * @param {'NOT_STARTED' |'INQUEUE' | 'INPROGRESS' | 'COMPLETED' | 'FAILED' | 'DEPENDENCY_FAILED'} status
     */
    setStatus(status) {
        this.#status = status;
        if (this.settled) {
            this.#notifyOnSettled();
        }
    }

    get settled() {
        return this.status === 'FAILED' || this.status === 'COMPLETED' || this.status === 'DEPENDENCY_FAILED';
    }

    #onSuccess(result) {
        this.#result.result = result;
        this.setStatus('COMPLETED');
    }

    #onFailure(error) {
        this.#result.error = error;
        this.setStatus('FAILED');

    }

    #notifyOnSettled() {
        this.#subscribers.forEach(callback => callback());
    }

}

class TaskRunner {
    /**
     * @type {Map<string, string[]>}
     */
    #dependencyMap;

    /**
     * @type {Map<string, number>}
     */
    #indegreeMap;

    /**
     * @type {string[]}
     */
    #taskQueue

    /**
     * @type {Map<string, Task>}
     */
    #taskMap

    /**
     * @type {number}
     */
    #concurrencyCount

    /**
     * @type {Set<Function>}
     */
    #subscribers;

    /**
     * @type {number} Max concurrency
     */
    #maxConcurrency;


    /**
     * Task Runner Constructor
     * @param {Task[]} tasks 
     */
    constructor(tasks, maxConcurrency = 1) {
        this.#taskQueue = [];
        this.#concurrencyCount = 0;
        this.#taskMap = this.#buildTaskMap(tasks);
        this.#dependencyMap = this.#computeDependencyMap(tasks);
        this.#indegreeMap = this.#computeIndegreeMap();
        this.#subscribers = new Set();
        this.#maxConcurrency = maxConcurrency;
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
    }

    /**
     * 
     * @param {Task[]} tasks
     */
    #computeDependencyMap(tasks) {
        return tasks.reduce((map, current) => {
            map.set(current.id, map.has(current.id) ? map.get(current.id) : []);
            for (const dep of current.dependencies) {
                const adjNodes = map.has(dep) ? map.get(dep) : [];
                adjNodes.push(current.id);
                map.set(dep, adjNodes);
            }
            return map;
        }, new Map());
    }

    #computeIndegreeMap() {
        const map = [...this.#dependencyMap.keys()].reduce((map, key) => {
            const dependencies = this.#dependencyMap.get(key);
            map.set(key, map.has(key) ? map.get(key) : 0);
            for (const dependency of dependencies) {
                const currentIndegree = map.has(dependency) ? map.get(dependency) : 0;
                map.set(dependency, currentIndegree + 1);
            }
            return map;
        }, new Map());
        const independentTasks = [...map.keys()].filter(key => map.get(key) === 0);
        if (!independentTasks.length) {
            throw new Error('There are no task which can run indendently. All tasks have some dependencies.')
        }
        return map;
    }
    /**
     * 
     * @param {Task[]} tasks 
     */
    #buildTaskMap(tasks) {
        return tasks.reduce((map, task) => {
            map.set(task.id, task);
            return map;
        }, new Map());
    }

    start() {
        console.log(this.#dependencyMap);
        console.log(this.#indegreeMap);
        const queue = [...this.#indegreeMap.keys()].filter(key => this.#indegreeMap.get(key) === 0);
        while (queue.length) {
            const currentTaskId = queue.shift();
            this.#taskQueue.push(currentTaskId);
            const dependentTasks = this.#dependencyMap.get(currentTaskId);
            for (const task of dependentTasks) {
                const updatedIndegree = this.#indegreeMap.get(task) - 1;
                this.#indegreeMap.set(task, updatedIndegree);
                if (updatedIndegree === 0) {
                    queue.push(task);
                }
            }
        }
        if (this.#taskQueue.length !== [...this.#taskMap.keys()].length) {
            throw new Error("dependency map is cyclic...");
        }
        this.#processTaskQueue();
    }

    #processTaskQueue() {
        if (this.#concurrencyCount >= this.#maxConcurrency) {
            return;
        }

        if (this.#taskQueue.length === 0 && this.#concurrencyCount === 0) {
            this.#notify();
            return;
        }
        if (this.#taskQueue.length) {
            const current = this.#taskQueue.shift();
            const dependencies = this.#taskMap.get(current).dependencies;
            const taskToRun = this.#taskMap.get(current);
            let shouldStart = true;
            let hasDependencyFailed = false;

            // Check if dependencies are completed
            for (const dep of dependencies) {
                const depTask = this.#taskMap.get(dep);
                if (depTask.status === 'FAILED') {
                    shouldStart = false;
                    hasDependencyFailed = true;
                    taskToRun.setStatus('DEPENDENCY_FAILED');
                    break;
                } else if (depTask.status !== 'COMPLETED') {
                    shouldStart = false;
                }
            }

            if (hasDependencyFailed) {
                return this.#processTaskQueue();  // Skip the failed task and process the next
            }
            if (!shouldStart) {
                this.#taskQueue.push(current);
            } else {
                // no dependencies or all dependencies are successfully completed
                // run the task
                taskToRun.subscribe(() => {
                    this.#concurrencyCount--;
                    setTimeout(() => this.#processTaskQueue(), 0);  // Process the next task when current completes
                });
                this.#concurrencyCount += 1;
                taskToRun.run();
            }
        }
        if (this.#taskQueue.length) {
            setTimeout(() => this.#processTaskQueue(), 0);
        }
    }

    #notify() {
        const result = [...this.#taskMap.keys()].reduce((map, key) => {
            map.set(key, this.#taskMap.get(key).result);
            return map;
        }, new Map());
        for (const subscriber of this.#subscribers) {
            subscriber(result);
        }
    }
}

function testCaseWithCyclicDependency() {
    const taskA = new Task('A', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task A');
        onSuccess('Task A');
    }, 300)); // Task A depends on Task B

    const taskB = new Task('B', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task B');
        onSuccess('Task B');
    }, 100)); // Task B depends on Task C

    const taskC = new Task('C', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task C');
        onSuccess('Task C');
    }, 100)); // Task C depends on Task A

    taskA.dependencies = [taskB];
    taskB.dependencies = [taskC];
    taskC.dependencies = [taskA];

    const taskRunner = new TaskRunner([
        taskA,
        taskB,
        taskC
    ]);

    taskRunner.subscribe((result) => {
        console.log('All completed');
        console.log(result);
    });

    taskRunner.start();
}

function testCaseWithAcyclicDependency() {
    const taskA = new Task('A', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task A');
        onSuccess('Task A');
    }, 500));
    
    const taskB = new Task('B', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task B');
        onFailure('Task B');
    }, 0));
    
    const taskC = new Task('C', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task C');
        onSuccess('Task C');
    }, 100));
    
    const taskD = new Task('D', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task D');
        onSuccess('Task D');
    }, 800));
    
    const taskE = new Task('E', (onSuccess, onFailure) => setTimeout(() => {
        console.log('Task E');
        onSuccess('Task E');
    }, 100));

    taskD.dependencies = [taskA, taskB];
    taskE.dependencies = [taskC, taskD];

    
    const taskRunner = new TaskRunner([
        taskA,
        taskB,
        taskC,
        taskD,
        taskE,
    ], 2);
    
    taskRunner.subscribe((result) => {
        console.log('All completed');
        console.log(result);
    });
    
    taskRunner.start();
}

testCaseWithAcyclicDependency();

// try {
//     testCaseWithCyclicDependency();
// } catch (err) {
//     console.error(err);
// }