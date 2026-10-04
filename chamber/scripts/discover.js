import { places } from "../data/places.mjs";

const discoverGrid = document.querySelector("#discover-grid");

places.forEach((place, index) => {

    const card = document.createElement("article");

    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="images/${place.image}"
                srcset="
                    images/${place.image.replace(".webp", "-300.webp")} 300w,
                    images/${place.image} 600w
                "
                sizes="
                    (max-width: 640px) calc(100vw - 2rem),
                    (max-width: 1024px) calc(50vw - 2.25rem),
                    342px
                "
                alt="${place.name}"
                width="300"
                height="200"
                ${index === 0
                    ? 'fetchpriority="high"'
                    : 'loading="lazy"'}
            >
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button" class="learn-more" data-place="${place.name}">
            Learn More
        </button>
    `;

    discoverGrid.appendChild(card);

    // Dialog
    const dialog = document.createElement("dialog");

    dialog.innerHTML = `
    <h2>${place.name}</h2>
    <p>${place.moreInfo}</p>
    <button type="button" class="close-dialog">Close</button>
`;

    document.body.appendChild(dialog);

    const learnMoreButton = card.querySelector(".learn-more");
    const closeButton = dialog.querySelector(".close-dialog");

    learnMoreButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
    });
});

// Last visit message
const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const difference = currentVisit - Number(lastVisit);
    const daysSinceLastVisit = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
        visitMessage.textContent = "Welcome back! It's been 1 day since your last visit.";
    } else {
        visitMessage.textContent = `Welcome back! It's been ${daysSinceLastVisit} days since your last visit.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);