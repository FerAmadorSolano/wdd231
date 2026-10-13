const planDetails = document.querySelector("#plan-details");
const savedPlan = localStorage.getItem("rutaXalapaPlan");
const params = new URLSearchParams(window.location.search);

const interestLabels = {
    nature: "Nature and outdoor spaces",
    culture: "Culture and history",
    towns: "Nearby towns",
    coffee: "Coffee experiences",
    food: "Local food"
};

const travelerLabels = {
    "1": "Just me",
    "2": "2 people",
    "3-4": "3–4 people",
    "5+": "5 or more people"
};

function addDetail(container, label, value) {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    paragraph.append(strong, document.createTextNode(value || "Not provided"));
    container.appendChild(paragraph);
}

if (planDetails) {
    const name = params.get("name");
    const date = params.get("date");
    const interest = params.get("interest");
    const travelers = params.get("travelers");
    const notes = params.get("notes");

    if (name && date && interest && travelers) {
        planDetails.replaceChildren();

        addDetail(planDetails, "Name", name);
        addDetail(planDetails, "Preferred visit date", date);
        addDetail(
            planDetails,
            "Main interest",
            interestLabels[interest] || interest
        );
        addDetail(
            planDetails,
            "Travelers",
            travelerLabels[travelers] || travelers
        );

        if (notes) {
            addDetail(planDetails, "Additional notes", notes);
        }
    } else if (savedPlan) {
        const plan = JSON.parse(savedPlan);
        planDetails.replaceChildren();

        addDetail(planDetails, "Name", plan.name);
        addDetail(planDetails, "Preferred visit date", plan.date);
        addDetail(
            planDetails,
            "Main interest",
            interestLabels[plan.interest] || plan.interest
        );
        addDetail(
            planDetails,
            "Travelers",
            travelerLabels[plan.travelers] || plan.travelers
        );

        if (plan.notes) {
            addDetail(planDetails, "Additional notes", plan.notes);
        }
    } else {
        planDetails.textContent =
            "No visit plan was found. Please complete the planning form first.";

        const link = document.createElement("a");
        link.href = "plan.html";
        link.textContent = "Create a visit plan";
        planDetails.appendChild(link);
    }
}