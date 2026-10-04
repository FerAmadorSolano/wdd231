import { places } from "../data/places.mjs";

const discoverGrid = document.querySelector("#discover-grid");

places.forEach((place) => {

    const card = document.createElement("article");

    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="images/${place.image}"
                alt="${place.name}"
                loading="lazy">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button" class="learn-more">
            Learn More
        </button>
    `;

    discoverGrid.appendChild(card);
});