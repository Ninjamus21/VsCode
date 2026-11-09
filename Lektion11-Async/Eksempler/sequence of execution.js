"use strict";

function getPromise(){
    return new Promise((resolved, rejected) => {
        //throw Error("fejl")   
        console.log("start promise executor") 
        //rejected(1);
        resolved(6);
    })
}
   
//getPromise().then(() => console.log("Resolved"))
let p1 = getPromise();
console.log("after getPromise but before then");
p1.then(resolved);
function resolved(result) {
    console.log("resolved " + result)
}

//getPromise().then(() => console.log("Resolved"))


// try {
// setTimeout(() => {
//     throw Error("fejl")
// }, 1);
// } catch(e) {
//     console.log("fejl")
// }




