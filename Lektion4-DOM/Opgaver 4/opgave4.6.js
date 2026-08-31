const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" }
];
sortTable(MOUNTAINS, "height");

let tablediv = document.querySelector('#mountains');
let table = '<table><tr><th>Mountain</th><th>Height</th><th>Place</th></tr>';

let values = ["name", "height", "place"];

for (let m of MOUNTAINS) {
    table += '<tr><td>' + m[values[0]] + '</td><td>' + m[values[1]] + '</td><td>' + m[values[2]] + '</td></tr>';
}
table += '</table>';
tablediv.innerHTML = table;

function sortTable(array, field) {
    array.sort((a, b) => a[field] - b[field]);
    return array;
}