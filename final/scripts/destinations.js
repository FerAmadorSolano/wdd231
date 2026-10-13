const placesUrl = "./data/places.json";

export async function getPlaces() {
    try {
        const response = await fetch(placesUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Unable to load destinations:", error);
        return [];
    }
}

export function createPlaceCard(place) {
    return `
        <article class="destination-card">
            <img
                src="${place.image}"
                alt="${place.alt}"
                width="600"
                height="400"
                loading="lazy"
            >
            <div class="destination-card-content">
                <p class="eyebrow">${place.location}</p>
                <h3>${place.name}</h3>
                <p>${place.description}</p>

                <button
                    class="button details-button"
                    type="button"
                    data-place-id="${place.id}"
                    aria-label="View details about ${place.name}"
                >
                    View Details
                </button>
            </div>
        </article>
    `;
}