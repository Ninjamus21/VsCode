const BASE_URL = "http://localhost:8080";
const BESKEDER_URL = BASE_URL + "/beskeder";
const RUM_URL = BASE_URL + "/rum";
const SLET_URL = BASE_URL + "/besked/";

let valgtRum = ""; // "" betyder alle rum

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
    return await respons.json();
}

async function del(url) {
    const respons = await fetch(url, { method: "DELETE" });
    if (!respons.ok) {
        throw new Error(`HTTP ${respons.status}`);
    }
}

function fillChatTable(beskeder) {
    const tbody = document.getElementById("chatTableBody");
    tbody.innerHTML = "";
    beskeder.forEach((besked) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = besked.chatRum;
        row.insertCell(1).textContent = besked.besked;

        const knap = document.createElement("button");
        knap.textContent = "Slet";
        knap.addEventListener("click", () => deleteMessage(besked.nr));
        row.insertCell(2).appendChild(knap);
    });
}

async function specifyRoom(rum) {
    valgtRum = rum;
    try {
        const url = rum ? BESKEDER_URL + "/rum/" + encodeURIComponent(rum) : BESKEDER_URL;
        fillChatTable(await get(url));
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

async function loadRoomButtons() {
    document.getElementById("knapper").innerHTML = "";
    addButton("Alle", "");
    try {
        const rumListe = await get(RUM_URL);
        rumListe.forEach((rum) => addButton(rum, rum));
    } catch (error) {
        console.error("Error loading rooms:", error);
    }
}

async function addMessage() {
    const beskedInput = document.getElementById("beskedInput");
    const rumInput = document.getElementById("rumInput");

    const besked = {
        besked: beskedInput.value.trim(),
        chatRum: rumInput.value.trim(),
    };

    if (!besked.besked || !besked.chatRum) {
        alert("Udfyld både rum og besked");
        return;
    }

    try {
        await post(BESKEDER_URL, besked);
        beskedInput.value = "";
        await loadRoomButtons();          // nyt rum får en knap
        await specifyRoom(besked.chatRum);
    } catch (error) {
        console.error("Error posting message:", error);
    }
}

async function deleteMessage(nr) {
    try {
        await del(SLET_URL + nr);
        await loadRoomButtons();          // et rum kan være blevet tomt
        await specifyRoom(valgtRum);
    } catch (error) {
        console.error("Error deleting message:", error);
    }
}

async function init() {
    document.getElementById("addMessageButton").addEventListener("click", addMessage);
    await loadRoomButtons();
    await specifyRoom("");
}

document.getElementById("chat").addEventListener("submit", (event) => {
    event.preventDefault(); // stops the page from reloading
    tilfoejBesked();
});

init();