// Current year
const year = new Date().getFullYear();

document.getElementById("currentyear").textContent = year;

// Last modified date
document.getElementById("lastModified").innerHTML =
    `Last Modified: ${document.lastModified}`;

// Menu Button
const menuBtn = document.querySelector("#menu-btn");
const navigation = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// WEATHER

const apiKey = "7497ae954a7ae3d027416056f26763de";
const lat = 17.05;
const lon = -96.7167;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

async function getWeather() {
    const response = await fetch(currentWeatherURL);
    const data = await response.json();
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherContainer = document.querySelector("#current-weather");

    weatherContainer.innerHTML = `
        <img src="${icon}" alt="${data.weather[0].description}">
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp)} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        
    `;
}

getWeather();

async function getForecast() {
    const response = await fetch(forecastURL);
    const data = await response.json();

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    const threeDays = dailyForecast.slice(0, 3);

    const forecastContainer = document.getElementById("forecast-container");

    threeDays.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");

        const date = new Date(day.dt_txt);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        card.innerHTML = `
        <h4>${dayName}</h4>
        <img src="${icon}" alt="${day.weather[0].description}">
        <p>${Math.round(day.main.temp)}°C</p>
        <p>${day.weather[0].description}</p>
    `;

        forecastContainer.appendChild(card);
    });
}

getForecast();

// COMPANY SPOTLIGHTS

async function getSpotlights() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const qualifiedMembers = data.members.filter(member =>
        member.mLevel === 1 || member.mLevel === 2
    );

    const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
    const spotlights = shuffledMembers.slice(0, 3);

    const spotlightContainer = document.getElementById("spotlight-container");

    spotlights.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const membership = member.mLevel === 1 ? "Gold" : "Silver";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership:</strong> ${membership}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();