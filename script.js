// Event Listeners 
const emailAddress = document.querySelector("#email");
const initialPassword = document.querySelector("#password");
const confirmThePassword = document.querySelector("#confirm-password");
const phoneNumber = document.querySelector('#phone-number');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');


const form = document.querySelector("#signup");

// Prevents the form from submitting
form.addEventListener("submit", function(e) {
    e.preventDefault();
});

// Utility Functions

const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isPhoneValid = (phoneNum) => {
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return re.test(phoneNum);
}






//Functions to show error / success

const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector("small");
    error.textContent = "";
}

// Input Validating Functions

// Validate First Name field
const checkFirstName = () => {
    let valid = false;
    const firstNombre = firstName.value.trim();

    if(!isRequired(firstNombre)) {
        showError(firstName, '* First name cannot be blank. ');
    } else {
        showSuccess(firstName);
        valid = true;
    }
};

// Validate Last Name field
const checkLastName = () => {
    let valid = false;
    const lastNombre = lastName.value.trim();

    if(!isRequired(lastNombre)) {
        showError(lastName, '* Last name cannot be blank. ');
    } else {
        showSuccess(lastName);
        valid = true;
    }
};

//Validate the Email Field
const checkEmail = () => {
    let valid = false;
    const email = emailAddress.value.trim();
    if (!isRequired(email)) {
        showError(emailAddress, '* Email cannot be blank. ');
    } else if (!isEmailValid(email)) {
        showError(emailAddress, '* Email is not valid')
    } else {
        showSuccess(emailAddress);
        valid = true;
    }
    return valid;
};

// Validate Phone Number
const checkPhone = () => {
    let valid = false;
    const phone = phoneNumber.value.trim()
    if (!isRequired(phone)) {
        showError(phoneNumber, '* Phone number cannot be blank. ');
    } else if (!isPhoneValid(phone)) {
        showError(phoneNumber, '* Phone number is not valid')
    } else {
        showSuccess(phoneNumber);
        valid = true;
    }
    return valid;
};

//Validate PW field
const checkPassword = () => {
    let valid = false;
    const password = initialPassword.value.trim();
    if (!isRequired(password)) {
        showError(initialPassword, '* Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(initialPassword, '* Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(initialPassword);
        valid = true;
    }
    return valid;
};

// Validate Confirm Password
const checkConfirmPassword = () => {
    let valid = false; 

    const confirmPassword = confirmThePassword.value.trim();
    const password  =initialPassword.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmThePassword, '* Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmThePassword, '* Confirm password does not match');
    } else {
        showSuccess(confirmThePassword);
        valid = true;
    }
    return valid;
};


// Modifying the submit event handler
form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isPhoneValid = checkPhone(),
        isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName();
    

    let isFormValid = isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isFirstNameValid &&
        isLastNameValid;
    if (isFormValid) {

    }
});

//Input event handler
form.addEventListener('input', function(e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'password' :
            checkPassword();
            break;   
        case 'confirm-password' :
            checkConfirmPassword();
            break; 
        case 'phone-number' :
            checkPhone();
            break;   
        case 'first-name' :
            checkFirstName();
            break;
        case 'last-name' :
            checkLastName();
            break;             
    }
});
