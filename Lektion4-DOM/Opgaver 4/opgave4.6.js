const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" }
];

let tablediv = document.querySelector('#mountains');
let currentField = null;
let currentDirection = 1;

renderTable();

function renderTable() {
    let table = '<table><tr>' + '<th data-field="name">Mountain</th>' + '<th data-field="height">Height</th>' + '<th data-field="place">Place</th></tr>';
    for (let m of MOUNTAINS) {
        if  (m.height > 5000) {
            table += '<tr class="tall"><td>' + m.name + '</td><td>' + m.height + '</td><td>' + m.place + '</td></tr>';
        } else {
            table += '<tr><td>' + m.name + '</td><td>' + m.height + '</td><td>' + m.place + '</td></tr>';
        }
    }
    table += '</table>';
    tablediv.innerHTML = table;
}

function sortTable(array, field, direction) {
    array.sort((a, b) => {
        if (typeof a[field] === "number") {
            return (a[field] - b[field]) * direction;
        }
        return a[field].localeCompare(b[field]) * direction;
    });
    return array;
}

tablediv.addEventListener('click', (event) => {
    const th = event.target.closest('th');
    if (!th) return;

    const field = th.dataset.field;

    if (field === currentField) {
        currentDirection *= -1; // toggle retning ved klik på samme kolonne igen
    } else {
        currentField = field;
        currentDirection = 1;
    }

    sortTable(MOUNTAINS, currentField, currentDirection);
    renderTable(MOUNTAINS);
});