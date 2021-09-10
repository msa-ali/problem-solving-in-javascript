/*
    For an array, create an event subscribing and publishing mechanism, where an event gets dispatched,
    when an item is added to an array. Don't alter the push method, instead create a new pushWithEvent method.

    ex:

    const arr = [];
    arr.addListener('add', (items) => {

    });
    arr.pushWithEvent(20);
 */

Array.prototype.listeners = {};

Array.prototype.addListener = function(eventName, callback) {
    if(!this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
}

Array.prototype.triggerEvent = function(eventName, result) {
    const listeners = this.listeners[eventName];
    if(listeners && Array.isArray(listeners)) {
        listeners.forEach(listener => listener.call(null, result));
    }
}

Array.prototype.pushWithEvent = function(...args) {
    this.push(...args);
    this.triggerEvent('add', this);
}

const arr = [1,2,3,4];

arr.addListener('add', (result) => console.log('listening 1: ', result));

arr.addListener('add', (result) => console.log('listening 2: ', result));

arr.pushWithEvent(10, 11, 13);