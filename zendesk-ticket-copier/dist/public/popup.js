document.getElementById("copy-ticket").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab?.id !== undefined) {
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: copyTicketFromURL
      });
    } else {
      console.error("No active tab found.");
    }
  });
});

function showAlert(message) {
  const alertBox = document.getElementById("alert");
  if (alertBox) {
    alertBox.textContent = message;
    alertBox.classList.remove("hidden");
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 2000);
  }
}

function copyTicketFromURL() {
  try {
    const url = window.location.href;
    const ticketMatch = url.match(/\/tickets\/(\d+)/);

    if (ticketMatch && ticketMatch[1]) {
      const ticketNumber = `#${ticketMatch[1]}`;
      const tempInput = document.createElement("textarea");
      tempInput.value = ticketNumber;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      showAlert(`Ticket ${ticketNumber} copied!`);
    } else {
      showAlert("Ticket number not found.");
    }
  } catch (error) {
    console.error("Error copying ticket number:", error);
    showAlert("An unexpected error occurred.");
  }
}

// Calculator Component
document.addEventListener('DOMContentLoaded', function () {
  const priceInput = document.getElementById('price');
  const bonusOutput = document.getElementById('bonus');
  const buttons = document.querySelectorAll('.calculate-bonus');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const percentage = Number(this.dataset.percentage);
      const price = Number(priceInput.value);
      if (!isNaN(price)) {
        const bonus = price * (percentage / 100);
        bonusOutput.textContent = `Bonus: ${bonus}`;
      }
    });
  });

  // Copy Bonus Result Button
  document.getElementById('copy-price').addEventListener('click', () => {
    const bonusText = document.getElementById('bonus').textContent.replace('Bonus: ', '');
    const tempInput = document.createElement("textarea");
    tempInput.value = bonusText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showAlert(`Bonus ${bonusText} copied!`);
  });

  // Copy Email Button
  document.getElementById('copy-email').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id !== undefined) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: () => {
            const iconButton = document.querySelector('button[data-test-id="omnipanel-selector-item-customer-context"]');
            if (iconButton) {
              iconButton.click();
            }
            const emailElement = document.querySelector('[data-test-id="attribute-email-display"] .StyledFont-sc-1iildbo-0');
            if (emailElement) {
              const email = emailElement.textContent;
              const tempInput = document.createElement("textarea");
              tempInput.value = email;
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand("copy");
              document.body.removeChild(tempInput);
              return email;
            } else {
              return null;
            }
          }
        }, (results) => {
          const email = results[0].result;
          if (email) {
            showAlert(`Email ${email} copied!`);
          } else {
            showAlert("Email not found.");
          }
        });
      } else {
        console.error("No active tab found.");
      }
    });
  });
});
