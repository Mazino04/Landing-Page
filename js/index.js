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

    // Remove automatic modal display on page load

    // Show modal when 'Continue' button is clicked
    continueButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('block'); // Ensure the modal is visible
        localStorage.setItem('modalOpen', 'true'); // Save the modal state
    });

    // Close the modal when the close button (X) is clicked
    closeModalButton.addEventListener('click', () => {
        localStorage.setItem('modalOpen', 'false'); // Save the modal state

        // Clear input fields when closing the modal
        const inputs = [...modal.querySelectorAll('input[type=text]')];
        inputs.forEach(input => input.value = ''); // Clear all input fields

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
    }

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
    }

    const handleFocus = (e) => {
        e.target.select();
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
            return;
        }
        const digits = text.split('');
        inputs.forEach((input, index) => input.value = digits[index]);
        submit.focus();
    }

    inputs.forEach((input) => {
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('paste', handlePaste);
    });
});
