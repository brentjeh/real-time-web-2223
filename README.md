# Real Time Web ReadMe

<img src="dog.jpg" height=1200px width=100%>
(Geen poging om extra punten te scoren met een schattige hond)

## Link naar eindproduct/deployment
https://real-time-web-2223-production-4795.up.railway.app/

## Installatie
Gebruik de terminal om dit project te installeren en clonen.
```
git clone https://github.com/brentjeh/real-time-web-2223.git
```

Installeer de packages.
```
npm install
```

Start de server.
```
npm run start
```

## Intro
Het vak Real Time Web wordt gegeven door Justus en Shyanta. In dit vak ga ik leren hoe ik een real time web applicatie maak. Dit houdt in dat ik technieken ga leren hoe ik een open connectie opzet tussen de client en de server. Hierdoor kan ik real-time data versturen in beide richtingen, op hetzelfde moment.

### Wat ik ga leren
- Omgaan met real-time complexiteit;
- Omgaan met real-time client-server interactie;
- Omgaan met real-time gegevensbeheer;
- Omgaan met ondersteuning voor meerdere gebruikers.
- Omgaan met sockets en socket.io
- Omgaan met node js en express js

### Week 1
In de eerste week heb ik met klasgenoten gewerkt aan een chat applicatie, om op te warmen en te kijken hoe sockets werken. Verder ben ik ga nadenken over mijn concept voor de eindopdracht.

### Week 2
Deze week ga ik dieper in op client-server communicatie en datamanagement.
Als eerst ging ik een concept bedenken. Ik wist wel dat ik het mezelf niet al te moeilijk ging maken, aangezien ik in het vorige vak al best wat moeite met client-server communicatie had. Ik had hiervoor gelukkig een heel makkelijke API gevonden: De Dog API.

#### Mijn concept
Mijn concept is een spel waarin je moet raden welke hondsoort een bepaalde hond is gebaseerd op een plaatje op de webpagina. De gebruiker kan, met meerdere mensen, raden welk hondsoort er op het plaatje wordt weergegeven. Zodra de gebruiker het antwoord juist heeft geraden, wordt dit in de chat weergegeven.

<img src="concept.jpg" height=400px>

## De code
De structuur van mijn app:

public/css/style.css
public/js/script.js
views/index.ejs
app.js
package-lock.json
package.json

### app.js
Het app.js bestand is de hoofdserver van mijn app. De server gebruikt socket.io, node.js en Express.

De server luistert naar een connectie.
```
io.on('connection', socket => {
```

De server roept de statische bestanden op.
```
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
```

Hier haalt de server een willekeurig plaatje van een hond en de naam van het rassensoort van de hond. Met 'breed' wordt de naam van het rassensoort van de hond uit de URL gehaald.
```
const randomDog = async () => {
  const url = `https://dog.ceo/api/breeds/image/random`
  const pokeData = await fetchData(url)
  data = pokeData
  console.log(data)
  breed = data.message.split('/')[4];
  return data
  return breed
}

async function fetchData(url){
  const apiData = await fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err))
  return apiData
};
```

### script.js
```
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})
```

#### Data model
Omdat ik een klein idee wil hebben over welke data ik nodig heb om dit spel te maken, heb ik een data model gemaakt. Hierin heb ik de eigenschappen van de Dog API gezet.

<img src="data-model.jpg" height=400px>

## De data-lifecycle

<img src="data-lifecycle-diagram.jpg" height=400px>

## External data
De api die ik gebruikt heb voor mijn opdracht is de Dog API. Met deze API kan je plaatjes en hondsoort-namen ophalen. De hondsoorten kan je uit een URL krijgen (zoals ik heb gedaan). De Dog API is een RESTful API waarmee ontwikkelaars toegang hebben tot een uitgebreide database met informatie over honden, zoals rassen, afbeeldingen en feiten. Hier zijn enkele belangrijke eigenschappen van de Dog API:
- Rate Limiting: De Dog API heeft rate limiting ingesteld om misbruik te voorkomen en ervoor te zorgen dat de service presteert voor alle gebruikers. De huidige rate limit is       ingesteld op 1000 verzoeken per uur.
- Autorisatiemethode: Om de Dog API te gebruiken, moet je een API-sleutel verkrijgen van de API-provider. De API-sleutel wordt gebruikt om je verzoeken te authenticeren en ervoor   te zorgen dat je toestemming hebt om toegang te krijgen tot de API.
- API-methoden: De Dog API biedt verschillende API-methoden die ontwikkelaars kunnen gebruiken om informatie over honden op te halen. Deze omvatten: 
  Rassenlijst: Haalt een lijst op van alle hondenrassen die door de API worden erkend.
  Willekeurige afbeelding: Haalt een willekeurige afbeelding van een hond op.
  Rasafbeeldingen: Haalt een lijst met afbeeldingen op voor een specifiek hondenras.
  Raszoeken: Zoekt naar een specifiek hondenras op naam.
  Feiten: Haalt een willekeurig hondenfeit op.
