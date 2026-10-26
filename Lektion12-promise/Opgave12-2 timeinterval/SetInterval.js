// ved hjælp af start timer skal man start en timer der tæller op med 1 hvert sekund. Når man trykker på stop timer skal timeren stoppes
let time; 
let timeStop;
let intervalId;

// onclick event for start button
document.getElementById("startButton").addEventListener("click", startTimer);
function startTimer() {
    time = 0;
    timeStop = Date.now();
    intervalId = setInterval(() => {
        document.getElementById("actualTime").textContent = time = Date.now() - timeStop;
    }, 1);
}

document.getElementById("stopButton").addEventListener("click", stopTimer);
function stopTimer() {
    clearInterval(intervalId);
    timeStop = Date.now();
}


