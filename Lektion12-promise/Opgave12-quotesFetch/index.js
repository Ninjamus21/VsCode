let url = "https://api.kanye.rest/";
let quotes = [];

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.text();
}

// Henter én quote og returnerer et promise med selve teksten
function getQuote() {
    return get(url).then((data) => data.quote);
}

// Knappen: hent én quote og vis den i #resultlabel
function setupQuoteButton() {
    document.getElementById("fetchQuote").addEventListener("click", () => {
        getQuote()
            .then((quote) => {
                document.getElementById("resultlabel").textContent = quote;
            })
            .catch((error) => {
                document.getElementById("resultlabel").textContent = "Error: " + error.message;
            });
    });
}

setupQuoteButton();

// Hent 4 quotes parallelt og vis dem i #resultlabel1 til #resultlabel4
Promise.all([getQuote(), getQuote(), getQuote(), getQuote()])
    .then((results) => {
    quotes = results;
    const list = document.getElementById("quoteList");
    results.forEach((quote) => {
        const li = document.createElement("li");
        li.textContent = quote + " (from Promise.all)";
        list.appendChild(li);
    });
    })
    .catch((error) => {
        console.error(error);
    });
 

// Hent 4 quotes parallelt og vis den første der lykkes i #resultlabel
Promise.any([getQuote(), getQuote(), getQuote(), getQuote()])
    .then((result) => {
        quotes = [...quotes, result];
        const list = document.getElementById("quoteList");
        const li = document.createElement("li");
        li.textContent = result + " (from Promise.any)";
        list.appendChild(li);
        console.log("At least one promise resolved with result: " + result);
    })
    .catch((error) => {
        console.log("All promises were rejected with error: " + error);
    });


// hent 4 quotes med promise.allSettled og vis dem i #resultlabel
Promise.allSettled([getQuote(), getQuote(), getQuote(), getQuote()])
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                quotes = [...quotes, result.value];
                const list = document.getElementById("quoteList");
                const li = document.createElement("li");
                li.textContent = result.value + " (from Promise.allSettled)";
                list.appendChild(li);
                console.log(`Promise ${index + 1} resolved with value: ${result.value}`);
            }
            else if (result.status === "rejected") {
                console.log(`Promise ${index + 1} rejected with reason: ${result.reason}`);
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });


