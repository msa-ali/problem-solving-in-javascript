class CustomPromise {
    constructor(callback) {
        this._callbackList = [];
        this._state = 'pending';
        callback(this._onResolve.bind(this), this._onReject.bind(this))
    }

    then(successCallback) {
        this._callbackList.push(successCallback);
        return this;
    }

    catch(errorCallback) {
        this._errorCallback = errorCallback;
        return this;
    }

    finally(finalCallback) {
        this._finalCallback = finalCallback;
    }

    _onResolve(value) {
        setTimeout(() => {
            let intermediateResult = value;
            try {
                for (const cb of this._callbackList) {
                    intermediateResult = cb(intermediateResult);
                }
                this._finalCallback && this._finalCallback();
                this._state = 'fulfilled';
            } catch (error) {
                this._onReject(error);
            }
        });
    }

    _onReject(err) {
        setTimeout(() => {
            this._state = 'rejected';
            if (this._errorCallback) {
                this._errorCallback(err);
                this._finalCallback && this._finalCallback();
            } else {
                this._finalCallback && this._finalCallback();
                throw err;
            }
        })
    }

}

const promise = new CustomPromise((resolve, reject) => {
    reject(new Error('some error'));
}).then((value) => {
    console.log("1 ", value);
    return value * 10;
}).then((value) => {
    console.log("2 ", value);
    return value * 10;
}).then((value) => {
    console.log("3 ", value);
    return value * 10;
}).catch((err) => {
    console.log('Executing error callback!!');
    console.error(err);
}).finally(() => {
    console.log('I am getting executed at last!');
});
