// Members
const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const url = "data/members.json";

async function getMembers() {

    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data.members);
}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
        <img src="images/${member.image}" 
            alt="${member.name} logo"
            loading="lazy">

        <div class="member-info">
            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <a href="${member.website}" target="_blank" rel="noopener">
                Visit Website
            </a>
            <p>Membership Level: ${member.mLevel}</p>
        </div>
    `;

        membersContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("member-grid");
    membersContainer.classList.remove("member-list");

});

listButton.addEventListener("click", () => {

    membersContainer.classList.add("member-list");
    membersContainer.classList.remove("member-grid");

});

getMembers();