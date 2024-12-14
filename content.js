function copyTicketFromURL() {
    try {
        // Extract the ticket number directly from the URL using regex
        const url = window.location.href;
        const ticketMatch = url.match(/\/tickets\/(\d+)/);

        if (ticketMatch && ticketMatch[1]) {
            const ticketNumber = `#${ticketMatch[1]}`; // Format as #6, #123, etc.

            // Copy the ticket number to the clipboard
            const tempInput = document.createElement("textarea");
            tempInput.value = ticketNumber;
            document.body.appendChild(tempInput);

            tempInput.select();
            document.execCommand("copy");

            document.body.removeChild(tempInput);

            console.log(`Copied to clipboard: ${ticketNumber}`);
            alert(`Copied: ${ticketNumber}`);
        } else {
            alert("Ticket number not found in the URL.");
        }
    } catch (error) {
        console.error("Error copying ticket number:", error);
        alert("An unexpected error occurred.");
    }
}

// Run the function
copyTicketFromURL();
