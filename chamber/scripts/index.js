const apiKey = "7497ae954a7ae3d027416056f26763de";
const city = "Oaxaca de Juárez";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });