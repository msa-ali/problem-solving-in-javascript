const bind = function(fn, context) {
    return function(...args) {
      return fn.apply(context, args);
    }
  }
  
  function multiply(a) {
    console.log(this.val * a.val2);
  }
  
  var obj = {val : 2}
  function callingBind(){
    const bindFunc = bind(multiply, obj)
    bindFunc.call(this,{val2 : 2}) 
  }