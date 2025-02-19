let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 } // Reset to the first slide if it exceeds the total
    slides[slideIndex - 1].style.display = "block";  // Show the current slide
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

window.onload = function () {
    showSlides();  // Start the slideshow when the page loads
};

document.addEventListener('DOMContentLoaded', () => {
    const continueButton = document.getElementById('continueButton');
    const modal = document.getElementById('phoneVerificationModal');
    const closeModalButton = document.getElementById('closeModal');
    const paymentMethodModal = document.getElementById('paymentMethodModal');
    const closePaymentMethodModalButton = document.getElementById('closePaymentMethodModal');
    const prepaidButton = document.getElementById('prepaidButton');
    const creditCardButton = document.getElementById('creditCardButton');

    // Variable to hold the countdown interval ID
    let resendIntervalId;

    // Show modal when 'Continue' button is clicked
    continueButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('block'); // Ensure the modal is visible
        localStorage.setItem('modalOpen', 'true'); // Save the modal state

        // Disable resend link and start 30-second countdown
        const resendLink = modal.querySelector('.text-sm a');
        if (resendLink) {
            // Disable clicking on the link
            resendLink.style.pointerEvents = 'none';
            let countdown = 30;
            resendLink.textContent = `Resend (${countdown})`;

            // Clear any existing interval before starting a new one
            if (resendIntervalId) {
                clearInterval(resendIntervalId);
            }
            resendIntervalId = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    resendLink.textContent = `Resend (${countdown})`;
                } else {
                    clearInterval(resendIntervalId);
                    resendIntervalId = null;
                    resendLink.textContent = 'Resend';
                    resendLink.style.pointerEvents = 'auto';
                }
            }, 1000);
        }
    });

    // Close the phone verification modal
    closeModalButton.addEventListener('click', () => {
        localStorage.setItem('modalOpen', 'false'); // Save the modal state

        // Clear input fields when closing the modal
        const inputs = [...modal.querySelectorAll('input[type=text]')];
        inputs.forEach(input => input.value = ''); // Clear all input fields

        // Clear the resend countdown timer and reset the link if needed
        const resendLink = modal.querySelector('.text-sm a');
        if (resendIntervalId) {
            clearInterval(resendIntervalId);
            resendIntervalId = null;
        }
        if (resendLink) {
            resendLink.textContent = 'Resend';
            resendLink.style.pointerEvents = 'auto';
        }

        // Wait for the transition to complete, then hide the modal
        setTimeout(() => {
            modal.classList.remove('block');
            modal.classList.add('hidden');
        }, 300); // Duration of the transition
    });

    // Handle OTP form input behavior
    const form = document.getElementById('otp-form');
    const inputs = [...form.querySelectorAll('input[type=text]')];
    const submit = form.querySelector('button[type=submit]');

    const handleKeyDown = (e) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
            e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            const index = inputs.indexOf(e.target);
            if (index > 0) {
                inputs[index - 1].value = '';
                inputs[index - 1].focus();
            }
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputs.indexOf(target);
        if (target.value) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                submit.focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
            return;
        }
        const digits = text.split('');
        inputs.forEach((input, index) => input.value = digits[index]);
        submit.focus();
    };

    inputs.forEach((input) => {
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('paste', handlePaste);
    });

    // Simulate successful verification and show payment modal
    const verifyButton = modal.querySelector('button[type=button]'); // Assuming this is the "Verify number" button
    verifyButton.addEventListener('click', () => {
        // Hide phone verification modal
        modal.classList.remove('block');
        modal.classList.add('hidden');

        // Show payment method modal
        paymentMethodModal.classList.remove('hidden');
        paymentMethodModal.classList.add('block');
    });

    // Close the payment method modal
    closePaymentMethodModalButton.addEventListener('click', () => {
        paymentMethodModal.classList.remove('block');
        paymentMethodModal.classList.add('hidden');
    });

    // Handle payment method selection
    prepaidButton.addEventListener('click', () => {
        alert('You selected Prepaid Credit');
        // You can add additional functionality for prepaid credit here
    });

    creditCardButton.addEventListener('click', () => {
        alert('You selected Credit Card');
        // You can add additional functionality for credit card here
    });
});




function showModal(event) {
    event.preventDefault(); // Prevent the form from submitting
    const modal = document.getElementById("success-modal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("success-modal");
    modal.style.display = "none";
}

function continueShopping() {
    // Close the modal
    closeModal();


}


document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("#eael-data-table-7b3f15e tbody tr");
    const showMoreBtn = document.getElementById("showmoreButton");
    let isExpanded = false;

    // Hide all rows except the first 5
    rows.forEach((row, index) => {
        if (index >= 5) {
            row.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        if (isExpanded) {
            rows.forEach((row, index) => {
                if (index >= 5) {
                    row.style.display = "none";
                }
            });
            showMoreBtn.textContent = "Show More";
        } else {
            rows.forEach(row => {
                row.style.display = "table-row";
            });
            showMoreBtn.textContent = "Show Less";
        }
        isExpanded = !isExpanded;
    });

    // Ensure that the button's styling is not altered by the script
    showMoreBtn.style.cssText = "display: inline-block;";

    // Move the button outside the table to prevent affecting its styling
    document.querySelector("#eael-data-table-7b3f15e").parentNode.appendChild(showMoreBtn);
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".card__button").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".card__content");
            let price = card.querySelector(".card__pricing-number").textContent.trim();
            let duration = card.querySelector(".card__header-subtitle").textContent.trim();
            let dataAmount = card.querySelector(".card__header-title").textContent.trim();

            // Redirect to checkout.html with selected plan details as query parameters
            window.location.href = `checkout.html`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const prepaidBtn = document.getElementById("prepaid-btn");
    const cardBtn = document.getElementById("card-btn");
    const continueBtn = document.getElementById("continue-btn");

    let selectedMethod = null;

    function toggleSelection(button) {
        if (selectedMethod === button) {
            // Unselect if the same button is clicked again
            button.classList.remove("selected");
            selectedMethod = null;
            disableContinueButton();
        } else {
            // Select new button and deselect the previous one
            if (selectedMethod) {
                selectedMethod.classList.remove("selected");
            }
            button.classList.add("selected");
            selectedMethod = button;
            enableContinueButton();
        }
    }

    function disableContinueButton() {
        continueBtn.disabled = true;
        continueBtn.classList.add("opacity-50", "cursor-not-allowed", "pointer-events-none");
    }

    function enableContinueButton() {
        continueBtn.disabled = false;
        continueBtn.classList.remove("opacity-50", "cursor-not-allowed", "pointer-events-none");
    }

    prepaidBtn.addEventListener("click", function () {
        toggleSelection(prepaidBtn);
    });

    cardBtn.addEventListener("click", function () {
        toggleSelection(cardBtn);
    });

    // Initially disable the continue button
    disableContinueButton();
});
