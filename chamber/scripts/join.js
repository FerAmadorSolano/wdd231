const membershipLevels = [
    {
        name: "NP Membership",
        id: "np",
        description: "For nonprofit organizations.",
        benefits: [
            "No membership fee",
            "Networking opportunities",
            "Access to chamber events",
            "Community involvement opportunities"
        ]
    },

    {
        name: "Bronze Membership",
        id: "bronze",
        description: "For businesses beginning to grow.",
        benefits: [
            "Access to chamber events",
            "Networking opportunities",
            "Business directory listing",
            "Community business resources"
        ]
    },

    {
        name: "Silver Membership",
        id: "silver",
        description: "For growing businesses.",
        benefits: [
            "All Bronze membership benefits",
            "Enhanced directory listing",
            "Advertising opportunities",
            "Discounts on selected chamber events"
        ]
    },

    {
        name: "Gold Membership",
        id: "gold",
        description: "For businesses seeking greater visibility.",
        benefits: [
            "All Silver membership benefits",
            "Premium business visibility",
            "Priority networking opportunities",
            "Featured business promotions",
            "Additional advertising opportunities"
        ]
    }
];

const membershipContainer = document.querySelector("#membership-container");

membershipLevels.forEach((membership) => {
    const card = document.createElement("article");
    card.classList.add("membership-card");
    card.innerHTML = `
        <h3>${membership.name}</h3>
        <p>${membership.description}</p>
        <button type="button" class="membership-button" data-modal="${membership.id}-modal"> 
            View Benefits 
        </button>
    `;

    membershipContainer.appendChild(card);
})

membershipLevels.forEach((membership) => {

    const modal = document.createElement("dialog");
    modal.id = `${membership.id}-modal`;
    modal.innerHTML = `
        <h2>${membership.name}</h2>
        <ul>
            ${membership.benefits.map((benefit) =>
                `<li>${benefit}</li>`).join("")}
        </ul>
        <button type="button" class="close-modal">
            Close
        </button>
    `;

    membershipContainer.appendChild(modal);
});

const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach((button) => {

    const modalId = button.dataset.modal;
    const modal = document.querySelector(`#${modalId}`);

    button.addEventListener("click", () => {
        modal.showModal();
    });

    const closeButton = modal.querySelector(".close-modal");

    closeButton.addEventListener("click", () => {
        modal.close();
    });
});

const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();