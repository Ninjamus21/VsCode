let url = "https://www.random.org/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new";

function getRandomNumber() {
    let promise = new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                let randomNumber = parseInt(data.trim()); // Konverterer tekst til heltal
                console.log(randomNumber);
                if (randomNumber <= 3) {
                    resolve(randomNumber);
                } else {
                    reject(randomNumber);
                }
            })
            .catch(error => {
                console.error("Error fetching random number:", error);
                reject(error);
            });
        });
    return promise;
}

getRandomNumber()
    .then(function (result) {
        console.log("Resolved with number: " + result);
    })
    .catch(function (error) {
        console.log("Rejected with error: " + error);
    });



let thatpromiseAll = Promise.all([getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()])
.then(function (results) {
    console.log("All promises resolved with results: " + results);
})
.catch(function (error) {
    console.log("At least one promise was rejected with error: " + error);
});
