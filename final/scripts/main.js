import { getPlaces, createPlaceCard } from "./destinations.js";

//console.log("Ruta Xalapa JavaScript is running!");


const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#currentyear");
const featuredContainer = document.querySelector("#featured-destinations");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// places
if (featuredContainer) {
    const places = await getPlaces();
    //console.log("Places loaded:", places);

    const featuredPlaces = places.filter(place => place.featured);
    //console.log("Featured places:", featuredPlaces);

    if (featuredPlaces.length > 0) {
        featuredContainer.innerHTML = featuredPlaces
            .map(createPlaceCard)
            .join("");
    } else {
        featuredContainer.textContent =
            "Destinations are temporarily unavailable. Please try again later.";
    }
}