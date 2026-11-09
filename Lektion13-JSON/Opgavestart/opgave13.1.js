// opgave12.1.js
const earthquakeUrl = // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';


//Tag udgangspunkt i opgave13.1.html, opgave13.1.css og opgave13.1.js.   Åben earthquakeUrl’en i en browser og undersøg den hentede JSON.  Lav dernæst en webside, der viser en tabel over den sidst uges jordskælv med en styrke på mindst 5. 
//Tabellen skal vise styrke, sted og tidspunkt for hvert jordskælv – sorteret efter styrke. 


function displayEarthquakes(earthquakes) {
    const table = document.getElementById('earthquakeTable');
    table.innerHTML = '<tr><th>Størrelse</th><th>Sted</th><th>Tidspunkt</th></tr>'; // Clear the table and add header

    earthquakes.forEach((earthquake) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = earthquake.properties.mag;
        row.insertCell(1).textContent = earthquake.properties.place;
        row.insertCell(2).textContent = new Date(earthquake.properties.time).toLocaleString('da-DK');
    });
}

async function loadEarthquakes() {
    try {
        const res = await fetch(earthquakeUrl);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();

        const filtered = data.features
            .filter((feature) => feature.properties.mag >= 5)
            .sort((a, b) => b.properties.mag - a.properties.mag);

        displayEarthquakes(filtered);
    } catch (error) {
        console.error('Error loading earthquakes:', error);
    }
}

displayEarthquakes([]); // Tom tabel indtil data er hentet
loadEarthquakes();