// ved hjælp af start timer skal man start en timer der tæller op med 1 hvert sekund. Når man trykker på stop timer skal timeren stoppes

let timer = 0;
let intervalId;

// onclick event for start button
document.getElementById("startButton").addEventListener("click", startTimer);
function startTimer() {
    intervalId = setInterval(() => {
        timer++;
        // opdaterer timeren på siden 
        document.getElementById("actualTime").textContent = timer;
    }, 1000);
}

document.getElementById("stopButton").addEventListener("click", stopTimer);
function stopTimer() {
    clearInterval(intervalId);
}


