

// opgave 5.1
let tid = document.querySelector("#tid");
tid.outerHTML = '<label for="tid">Tid:</label>' + tid.outerHTML;
let tal = document.querySelector("#tal");
tal.outerHTML = '<label for="tal">Tal:</label>' + tal.outerHTML;
let inputs = document.querySelectorAll("input");

// make the inputs clickable and set the time to the current time and the number a random number between 1 and 100
for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id === "tal") {
        inputs[i].onclick = () => {
            let RandomNumber = Math.floor(Math.random() * 100) + 1;
            inputs[i].value = RandomNumber;
        }
    } else if (inputs[i].id === "tid") {
        inputs[i].onclick = () => {
            let currentTime = new Date();
            inputs[i].value = currentTime.toLocaleTimeString();
        }
    }
}

let ryd = document.querySelector("#ryd");
ryd.onclick = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}