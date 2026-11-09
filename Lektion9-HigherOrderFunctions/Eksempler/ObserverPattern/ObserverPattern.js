/* 
Implementer et Observer pattern på følgende måde:
• Observers implementeres som funktioner, der kaldes, når de ”notifies”.
• Et Subject defineres som en subject funktion, der har et array med observers som lokal variabel
• Funktionen subject skal desuden definere funktionerne registerObserver og notifyObservers som
indre funktioner og returnere dem som metoder i et object. 
*/
let observerID = 0;

let observer = function (message) {
    observerID++;
    console.log("Observer " + observerID + " modtog besked: " + message);
}

let subject = function () {
    let observers = [];
    return {
        registerObserver: function (obs) {
            observers.push(obs);
        },
        notifyObservers: function (message) {
            observers.forEach(obs => obs(message));
        },
        unsubscribe: function (obs) {
            let i = observers.indexOf(obs);
            if (i !== -1) {
                observers.splice(i, 1);
            }
        }
    }
}

observerInstance1 = observer;
observerInstance2 = observer;
observerInstance3 = observer;

subjectInstance1 = subject();
subjectInstance1.registerObserver(observerInstance1);
subjectInstance1.registerObserver(observerInstance2);

subjectInstance1.notifyObservers("Hej alle sammen!");

subjectInstance1.unsubscribe(observerInstance1);
subjectInstance1.notifyObservers("Hej igen!");

subjectInstance2 = subject();
subjectInstance2.registerObserver(observerInstance3);
subjectInstance2.notifyObservers("Hej fra subject 2!");