const info = new URLSearchParams(window.location.search);

const firstName = info.get("firstName");
const lastName = info.get("lastName");
const email = info.get("email");
const phone = info.get("phone");
const organization = info.get("organization");
const timestamp = info.get("timestamp");

const formattedTimestamp = new Date(timestamp).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
});

const applicationInfo = document.querySelector("#application-info");

applicationInfo.innerHTML = `
    <h2>Application Information</h2>
    <p>
        <strong>Name:</strong> ${firstName} ${lastName}
    </p>

    <p>
        <strong>Email:</strong> ${email}
    </p>

    <p>
        <strong>Phone:</strong> ${phone}
    </p>

    <p>
        <strong>Organization:</strong> ${organization}
    </p>

    <p>
        <strong>Application submitted:</strong> ${formattedTimestamp}
    </p>
`;