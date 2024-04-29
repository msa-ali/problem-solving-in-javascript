// return the name value of the nth cat object using destructuring

function returnNthCat(n){
    const state = {
       cats : [
          {catId : 1 , name : "tom"},
          {catId : 2 , name : "tiggy"},
          {catId : 3 , name : "leo"},
          {catId : 4 , name : "nixie"}
       ],
       curpage : 3
    }
    const {cats: {[n]: {name}}} = state
    return name;
}