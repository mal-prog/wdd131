const form = document.getElementById('creditCardForm');
const cardNumberInput = document.getElementById('cardNumber');
const cardHolderInput = document.getElementById('cardHolder');
const expMonthInput = document.getElementById('expMonth');
const expYearInput = document.getElementById('expYear');
const cvvInput = document.getElementById('cvv');
const cvvDisplay = document.getElementById('cvvDisplay');
const successMessage = document.getElementById('successMessage');

// Format card number with spaces
cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Only allow numbers for card number
cardNumberInput.addEventListener('keypress', function(e) {
    if (!/\d/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

// Only allow numbers for expiration and CVV
[expMonthInput, expYearInput, cvvInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (!/\d/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    });
});

// Update CVV display on back of card
cvvInput.addEventListener('input', function(e) {
    cvvDisplay.textContent = e.target.value || 'XXX';
});

// Form validation
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    successMessage.classList.remove('show');
    
    let isValid = true;

    // Validate card number (must be exactly 1234123412341234)
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (cardNumber !== '1234123412341234') {
        cardNumberInput.classList.add('error');
        document.getElementById('cardNumberError').classList.add('show');
        isValid = false;
    }

    // Validate card holder
    if (cardHolderInput.value.trim() === '') {
        cardHolderInput.classList.add('error');
        document.getElementById('cardHolderError').classList.add('show');
        isValid = false;
    }

    // Validate expiration date
    const month = parseInt(expMonthInput.value);
    const year = parseInt(expYearInput.value);
    
    if (!month || !year || month < 1 || month > 12) {
        expMonthInput.classList.add('error');
        expYearInput.classList.add('error');
        document.getElementById('expirationError').classList.add('show');
        isValid = false;
    } else {
        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            expMonthInput.classList.add('error');
            expYearInput.classList.add('error');
            document.getElementById('expirationError').classList.add('show');
            isValid = false;
        }
    }

    // Validate CVV
    if (cvvInput.value.length !== 3) {
        cvvInput.classList.add('error');
        document.getElementById('cvvError').classList.add('show');
        isValid = false;
    }

    // If all validations pass
    if (isValid) {
        successMessage.classList.add('show');
        form.reset();
        cvvDisplay.textContent = 'XXX';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});
```

## File Structure:
```