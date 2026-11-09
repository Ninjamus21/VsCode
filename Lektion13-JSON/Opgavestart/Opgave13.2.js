const BESKEDER_URL = "https://beskedserver.azurewebsites.net/api/Beskeder/";
const RUM_URL = "https://beskedserver.azurewebsites.net/api/chatRum/";

async function get(url) {
    const respons = await fetch(url);
    if (!respons.ok) {
        throw new Error(`HTTP ${respons.status}`);
    }
    return await respons.json();
}

async function post(url, data) {
    const respons = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!respons.ok) {
        throw new Error(`HTTP ${respons.status}`);
    }
    return respons;
}

function fillChatTable(beskeder) {
    const tbody = document.getElementById("chatTableBody");
    tbody.innerHTML = "";
    beskeder.forEach((besked) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = besked.chatRum;
        row.insertCell(1).textContent = besked.tekst;
    });
}

// rum = "" betyder alle rum
async function specifyRoom(rum) {
    try {
        const beskeder = await get(BESKEDER_URL);
        const udvalgt = rum
            ? beskeder.filter((b) => b.chatRum.toLowerCase() === rum.toLowerCase())
            : beskeder;
        fillChatTable(udvalgt);
    } catch (error) {
        console.error("Error loading chat messages:", error);
    }
}

function addButton(tekst, rum) {
    const knap = document.createElement("button");
    knap.textContent = tekst;
    knap.addEventListener("click", () => specifyRoom(rum));
    document.getElementById("knapper").appendChild(knap);
}

async function addMessage() {
    const beskedInput = document.getElementById("beskedInput");
    const rumInput = document.getElementById("rumInput");

    const besked = {
        tekst: beskedInput.value.trim(),
        chatRum: rumInput.value.trim(),
    };

    if (!besked.tekst || !besked.chatRum) {
        alert("Udfyld både rum og besked");
        return;
    }

    try {
        await post(BESKEDER_URL, besked);
        beskedInput.value = "";
        await specifyRoom(besked.chatRum);
    } catch (error) {
        console.error("Error posting message:", error);
    }
}

async function init() {
    addButton("Alle", "");
    document.getElementById("addMessageButton").addEventListener("click", addMessage);

    try {
        const rumListe = await get(RUM_URL);
        rumListe.forEach((rum) => addButton(rum.navn, rum.navn));
    } catch (error) {
        console.error("Error loading rooms:", error);
    }

    specifyRoom("");
}

init();