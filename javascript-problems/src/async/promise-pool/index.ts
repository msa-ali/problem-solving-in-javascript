type F = () => Promise<any>;

async function promisePool(functions: F[], n: number): Promise<any> {
    const result = new Array(functions.length).fill(0);
    let promises: Promise<any>[] = [];
    for (let i = 0; i < functions.length; i++) {
        if (promises.length === n) {
            await Promise.race(promises);
        }
        const res = functions[i]().then((val) => {
            result[i] = val;
            promises = promises.filter(promise => promise !== res)
        })
        promises.push(res)
    }
    if (promises.length > 0) {
        await Promise.all(promises);
    }

    return result;
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */