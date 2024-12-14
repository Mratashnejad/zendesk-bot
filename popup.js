document.getElementById("copy-ticket").addEventListener("click", () => {
    // Get the active tab dynamically
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];  // Get the active tab
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: copyTicketFromURL
        });
    });
});

// Show alert when ticket is copied
function showAlert(message) {
    const alertBox = document.getElementById("alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertBox.classList.add("show");

    // Hide alert after 2 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);
}

// Function to copy ticket number (called by content.js)
function copyTicketFromURL() {
    try {
        const url = window.location.href;
        const ticketMatch = url.match(/\/tickets\/(\d+)/);

        if (ticketMatch && ticketMatch[1]) {
            const ticketNumber = `#${ticketMatch[1]}`;

            // Copy the ticket number to clipboard
            const tempInput = document.createElement("textarea");
            tempInput.value = ticketNumber;
            document.body.appendChild(tempInput);

            tempInput.select();
            document.execCommand("copy");

            document.body.removeChild(tempInput);

            // Show success alert
            showAlert(`Ticket ${ticketNumber} copied!`);
        } else {
            showAlert("Ticket number not found.");
        }
    } catch (error) {
        console.error("Error copying ticket number:", error);
        showAlert("An unexpected error occurred.");
    }
}
