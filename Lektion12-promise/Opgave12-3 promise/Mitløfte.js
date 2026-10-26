/* Lav en function, der returnerer et Promise. Indmaden (executor-function kaldes den) skal køre asynkront 
(brug f.eks. SetTimeout), finde et tilfældigt tal mellem 0 og 10 og resolve, rejecte eller fejle for udvalgte tal.  
F.eks. resolve for tal under 7, rejecte for tal over og smide exception for 10. 
*/

function getRandomNumber() {
    let promise = new Promise((resolve, reject) => {
        let randomNumber = Math.floor(Math.random() * 11); // Genererer et tilfældigt tal mellem 0 og 10
        console.log(randomNumber);
    
        setTimeout(() => { if (randomNumber < 7) {
            resolve(randomNumber); // Resolve for tal under 7
        } else if (randomNumber >= 7 && randomNumber < 10) {
            reject(randomNumber); // Reject for tal over 7 og under 10
        } else if (randomNumber === 10) {
            throw new Error("Exception: Tallet er 10!"); // Smider exception for tallet 10
        }
    }, 1000);
    });
    return promise;
}

/*
getRandomNumber()
    .then(function (result) {
        console.log("Resolved with number: " + result);
    })
    .catch(function (error) {
        console.log("Rejected with number: " + error);
    });
*/

// Opret 4 instanser af dette Promise (dvs. kald functionen 4 gange) og kør dem vha. Promise.all. 

/*
let thatpromiseAll = Promise.all([getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()])
    .then(function (results) {
        console.log("All promises resolved with results: " + results);
    })
    .catch(function (error) {
        console.log("At least one promise was rejected with error: " + error);
    });

    console.log("Promise.all is running...");
*/

// Opret 4 instanser af dette Promise (dvs. kald functionen 4 gange) og kør dem vha. Promise.any.

/*
let thatpromiseAny = Promise.any([getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()])
    .then(function (results) {
        console.log("All promises resolved with results: " + results);
    })
    .catch(function (error) {
        console.log("At least one promise was rejected with error: " + error);
    });

    console.log("Promise.any is running...");
*/
    // Opret 4 instanser af dette Promise (dvs. kald functionen 4 gange) og kør dem vha. Promise.allSettled.

     let thatpromise = Promise.allSettled([getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()])
    .then(function (results) {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Promise ${index + 1} resolved with value: ${result.value}`);
            } else if (result.status === "rejected") {
                console.log(`Promise ${index + 1} rejected with reason: ${result.reason}`);
            }
        });
    })
        .catch(function (error) {
            console.log("At least one promise was rejected with error: " + error);
        });

    console.log("Promise.allSettled is running...");
