/*
    Create a Job class which takes a callback function and a list of job instances which will be running some 
    async task. The callback function should be executed only when all the dependencies i.e. job instances are finished.
*/


class Job {
    #fn = null;
    #dependencies = [];
    #isFinished = false;
    #subscribers = [];
    #numOfCompletedJobs = 0;

    constructor(fn, dependencies = []) {
        this.#fn = fn;
        this.#dependencies = dependencies.filter(dep => dep instanceof Job && !dep.isJobFinished());
        this.#processJob();
    }

    isJobFinished() {
        return this.#isFinished;
    }

    finished() {
        this.#isFinished = true;
        this.#publish();
    }

    #publish() {
        this.#subscribers.forEach(subscriber => subscriber && subscriber());
    }

    subscribe(callback) {
        this.#subscribers.push(callback);
    }

    #trackDependencies() {
        this.#numOfCompletedJobs++;
        if (this.#numOfCompletedJobs === this.#dependencies.length) {
            this.#executeCallback();
        }
    }

    #executeCallback() {
        this.#fn.call(this, this.finished.bind(this));
    }

    #processJob() {
        if (
            !this.#dependencies.length ||
            this.#dependencies.every(dep => dep.isJobFinished())
        ) {
            return this.#executeCallback();
        }
        for (const job of this.#dependencies) {
            job.subscribe(this.#trackDependencies.bind(this))
        }

    }
}

const job1 = new Job((finished) => {
    setTimeout(() => {
        console.log('Running Job 1');
        finished();
    }, 500);
})

const job2 = new Job((finished) => {
    setTimeout(() => {
        console.log('Running Job 2');
        finished();
    }, 600);
})

const job3 = new Job((finished) => {
    setTimeout(() => {
        console.log('Running Job 3');
        finished();
    }, 400);
})

const job4 = new Job((finished) => {
    setTimeout(() => {
        console.log('Running Job 4');
        finished();
    }, 0);
}, [job1, job2, job3]);

job4.subscribe(() => {
    console.log('Subscriber 1');
})

job4.subscribe(() => {
    console.log('Subscriber 2');
})

job4.subscribe(() => {
    console.log('Subscriber 3');
})

job4.subscribe(() => {
    console.log('Subscriber 4');
})