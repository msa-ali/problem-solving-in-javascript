# Backbone Model

Before modern UI libraries like React, Angular, and Vue, Backbone.js was the popular library used for building web applications. Backbone.js is a lightweight JavaScript library that provides the structure for developing web applications by offering models, views, collections, and routers. It follows the principles of the Model-View-Controller (MVC) architectural pattern, helping developers organize their code in a modular and maintainable way.

In this question, we will focus on implementing a subset of functionality of `Backbone.Model` class functionality, which allows storing of attributes/values and responding to changes in specific attribute values.

## `BackboneModel` API

Implement the following APIs on the BackboneModel:

### `new BackboneModel([initialValues])`

Creates an instance of the BackboneModel class which accepts an optional object of attribute/value pairs. Attributes and event callbacks are isolated within the BackboneModel instances they're added to, aka callbacks shouldn't react to changes in other BackboneModel instances.

#### Parameter Description

- initialValues
  - Object
  - Initial values for the model attributes. Defaults to an empty object.

```js
const person1 = new BackboneModel();
const person2 = new BackboneModel({ name: 'John', age: 32 });
```

### `model.get(attribute)`

Get the value of a specific attribute.

#### Parameter Description

- attribute
  - string
  - The attribute name.
  
Returns the value of the specified attribute or undefined if the attribute is not set.

### `model.set(attribute, value)`

Set the value of a specific attribute. Fires the "change" event for the attribute.

#### Parameter Description

- attribute
  - string
  - The attribute name.
- value	
  - unknown
  - The value to set for the attribute.
  
### `model.has(attribute)`

Check if the model contains a specific attribute.

#### Parameter Description

- attribute
  - string
  - The attribute name.

Returns true if the model has the specified attribute, otherwise false.

### `model.unset(attribute)`

Removes the attribute from the model. Fires the "unset" event for the attribute.

#### Parameter Description

- attribute
  - string
  - The attribute name to unset.

### `model.on(event, attribute, callback, context)`

Register an event listener for changes to a specific attribute.

#### Parameter Description

- event
  - string
  - The event name, either 'change' or 'unset'.
- attribute
  - string
  - The attribute name to listen for changes.
- callback
  - Function
  - The callback function to be executed on the event.
- context	
  - any	(Optional) 
  - The context in which to execute the callback.
  
Each event callback is invoked with different parameters depending on the event:

- change: Fired when the value of an attribute changes (via model.set()). The callback is invoked with attribute name, new value, and old value, in that order.
- unset: Fired when an attribute is unset (via model.unset()). The callback is invoked with the attribute name.
  
The context parameter is optional and is used to specify the context (this value) in which the callback function should be executed.

### `model.off(event, attribute, callback)`

Remove an event listener for changes to a specific attribute.

#### Parameter Description

- event
  - string
  - The event name, either 'change' or 'unset'.
- attribute
  - string
  - The attribute name to stop listening for changes.
- callback
  - Function
  - The callback function to remove.

## Examples

```js
// Instantiate the BackboneModel.
const person = new BackboneModel({ name: 'John', age: 30 });

// Log initial values.
console.log(person.get('name')); // "John"
console.log(person.get('age')); // 30

// Set new values.
person.set('name', 'Jane');
person.set('age', 25);

// Log updated values.
console.log(person.get('name')); // "Jane"
console.log(person.get('age')); // 25

// Check if the model has a specific attribute.
console.log(person.has('name')); // true
console.log(person.has('gender')); // false

// Unset an attribute.
person.unset('age');
console.log(person.get('age')); // undefined

function nameChangeCallback(attribute, newName, oldName) {
  console.log(`'${attribute}' changed from '${newName}' to '${oldName}'`);
}
// Register an event listener for a change in the `name` field.
person.on('change', 'name', nameChangeCallback);

// Trigger the 'change' event for the 'name' attribute.
person.set('name', 'Bob');
// > "'name' changed from 'Jane' to 'Bob'"

// Remove an event listener for the 'name' attribute.
person.off('name', nameChangeCallback);

// Trigger the 'change' event again.
person.set('name', 'Alice');
// No output because the listener was removed.
```