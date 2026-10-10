
import { getPlaces, createPlaceCard } from "./destinations.js";

const destinationsContainer = document.querySelector("#all-destinations");
const resultsCount = document.querySelector("#results-count");
const filterButtons = document.querySelectorAll(".filter-button");

let allPlaces = [];

function displayPlaces(places) {
    if (!destinationsContainer || !resultsCount) return;

    if (places.length === 0) {
        destinationsContainer.innerHTML =
            "<p>No destinations found in this category yet.</p>";
    } else {
        destinationsContainer.innerHTML = places
            .map(createPlaceCard)
            .join("");
    }

    resultsCount.textContent =
        `${places.length} ${places.length === 1 ? "destination" : "destinations"} found`;
}

function filterPlaces(category) {
    const filteredPlaces = category === "all"
        ? allPlaces
        : allPlaces.filter(place => place.category === category);

    displayPlaces(filteredPlaces);

    filterButtons.forEach(button => {
        const isActive = button.dataset.category === category;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

async function initDestinationsPage() {
    allPlaces = await getPlaces();

    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    const validCategories = ["nature", "culture", "towns", "coffee", "food"];
    const initialCategory = validCategories.includes(requestedCategory)
        ? requestedCategory
        : "all";

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterPlaces(button.dataset.category);
        });
    });

    filterPlaces(initialCategory);
}

initDestinationsPage();
