const getData = async (url) => {
    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data); // Logger data
        return data;
    } catch (err) {
        console.error(err);
    }
};

const url = "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";

getData(url).then(data => {
    displayData(data);
});

const displayData = (data) => {
    const container = document.getElementById('container');
    if (container) {
        if (data && data.MultiDepartureBoard && data.MultiDepartureBoard.Departure) {
            const departures = data.MultiDepartureBoard.Departure;
            
            // Sorter Ankomst tid
            departures.sort((a, b) => {
                const timeA = a.date + ' ' + a.time;
                const timeB = b.date + ' ' + b.time;
                return new Date(timeA) - new Date(timeB);
            });

            // Clear html (den skal rettes til projektet)
            container.innerHTML += '';

            // Create and append elements for each departure
            departures.forEach((dep, index) => {
                if (index < 4){ ;
                const card = document.createElement('div');
                card.className = 'departureCard';
                
                card.innerHTML = `
                    <span class="stop">${dep.stop}</span>
                    <span class="name">${dep.name}</span>
                    <span class="time">Ankomst: Kl: ${dep.time}</span>
                `;

                container.appendChild(card);
                }
            });

        } else {
            container.innerHTML = '<p>Intet afgangs data fundet</p>';
        }
    } else {
        console.error('Fejl: Kunne ikke finde data-container');
    }
};

// Service Worker - en del af boilerplate ik tæmk på det :D
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

