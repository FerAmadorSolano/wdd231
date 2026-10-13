import { getPlaces } from "./destinations.js";

const destinationDialog = document.querySelector("#destination-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const doneDialogButton = document.querySelector("#dialog-done");
const dialogImage = document.querySelector("#dialog-image");
const dialogLocation = document.querySelector("#dialog-location");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");

let allPlaces = [];

async function loadPlaces() {
    allPlaces = await getPlaces();
}

loadPlaces();

function openDestinationDialog(place) {
    if (!destinationDialog || !place) return;

    dialogImage.src = place.image;
    dialogImage.alt = place.alt;
    dialogImage.hidden = false;
    dialogLocation.textContent = place.location;
    dialogTitle.textContent = place.name;
    dialogDescription.textContent = place.description;

    destinationDialog.showModal();
}

document.addEventListener("click", async event => {
    const button = event.target.closest(".details-button");

    if (!button) return;

    if (allPlaces.length === 0) {
        await loadPlaces();
    }

    const selectedPlace = allPlaces.find(
        place => String(place.id) === button.dataset.placeId
    );

    openDestinationDialog(selectedPlace);
});

function closeDestinationDialog() {
    if (destinationDialog?.open) {
        destinationDialog.close();
    }
}

closeDialogButton?.addEventListener("click", closeDestinationDialog);
doneDialogButton?.addEventListener("click", closeDestinationDialog);

destinationDialog?.addEventListener("click", event => {
    if (event.target === destinationDialog) {
        closeDestinationDialog();
    }
});