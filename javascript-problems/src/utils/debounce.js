const debounce = function (fn, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, delay);

    }
}