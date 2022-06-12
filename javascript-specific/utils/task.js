// For FE devs, this is basically Atreyu.
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

class Task {
    dependencies;
    job;
    currentDependencyCount;
    isCompleted;
    subscribedList;
    
    constructor(dependencies = [], job) {
        this.dependencies = dependencies ? dependencies.filter(dependency => !dependency.isCompleted) : [];
        this.currentDependencyCount = this.dependencies.length;
        this.job = job;
        this.isCompleted = false;
        this.processJob();
        this.subscribedList = [];
    }
    
    processJob() {
        if(this.dependencies && this.dependencies.length) {
            for(let dependency of this.dependencies) {
                dependency.subscribe(this.trackDependency.bind(this));
            }
        } else {
            this.job(this.done.bind(this));
        }
    }
    
    trackDependency() {
        this.currentDependencyCount--;
        if(this.currentDependencyCount === 0) {
            this.job(this.done.bind(this));
        }
    }
    
    subscribe(cb) {
        this.subscribedList.push(cb);
    }
    
    done() {
        this.isCompleted = true;
        for(const callback of this.subscribedList) {
            callback();
        }
    }
}

const processA = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process A');
        done();
    }, 100);
});

const processB = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process B');
        done();
    }, 1500);
});

const processC = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process C');
        done();
    }, 1000);
});

const processD = new Task([processA, processB], (done) => {
    setTimeout(() => {
        console.log('Process D');
        done();
    }, 1000);
})

const processE = new Task([processC, processD], (done) => {
    setTimeout(() => {
        console.log('Process E');
        done();
    }, 100);
});

const createAllDoneInstance = (allDoneCallback) => new Task([processA, processB, processC, processD, processE], allDoneCallback);

createAllDoneInstance((done) => {
    console.log('All is done!');
    done();
});
