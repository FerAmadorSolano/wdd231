const visitForm = document.querySelector("#visit-form");
const visitDate = document.querySelector("#visit-date");

// Don't select a day in the past
if (visitDate) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

    visitDate.min = localDate;
}

// Save preferences visit date
if (visitForm) {
    visitForm.addEventListener("submit", () => {
        const formData = new FormData(visitForm);
        const visitPlan = Object.fromEntries(formData.entries());

        localStorage.setItem("rutaXalapaPlan", JSON.stringify(visitPlan));
    });
}