/**
 * Contact form validation and submission handler
 * Implements form validation rules and manages form submission process
 */

import { FieldValidator, RequiredRule, EmailRule, MinLengthRule } from "./formValidator.js";

const form = document.getElementById('submitForm');

/**
 * Form field validators configuration
 * @type {FieldValidator[]}
 */
const validators = [
    new FieldValidator("firstname", [
        new MinLengthRule(2, "Vous devez saisir au minimum 2 caractères")
    ]),
    new FieldValidator("lastname", [
        new MinLengthRule(2, "Vous devez saisir au minimum 2 caractères")
    ]),
    new FieldValidator("email", [
        new EmailRule("Vous devez saisir un email valide")
    ]),
    new FieldValidator("message", [
        new RequiredRule("Ce champ est obligatoire")
    ])
];

/**
 * Sets up real-time validation for form input fields
 */
const inputForm = () => 
    form.querySelectorAll("input").forEach((field) => {
    field.addEventListener("input", (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        const fieldValidator = validators.find(validator => validator.fieldName === fieldName);
        const error = fieldValidator.validate(value);
        ErrorMessage(error, fieldName);
    });
});

/**
 * Handles form submission and validation
 * Prevents submission if validation fails
 */
const submitForm = () => form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValidate = true;
    const formSubmit = new FormData(e.target);
    const formData = Object.fromEntries(formSubmit.entries());

    for (const validator of validators) {
        const error = validator.validate(formData[validator.fieldName]);
        ErrorMessage(error, validator.fieldName);
        if (error) {
            isValidate = false;
        }
    }

    if (isValidate) {
        showSucessMessage(form);
    }
});

/**
 * Updates the form title with photographer's name
 * @param {Object} photographer - The photographer object
 */
const updateTitleForm = (photographer) => {
    const $title = document.getElementById("modalTitle")
    $title.innerHTML += `<br/> ${photographer.name}`
}

/**
 * Manages error message display for form fields
 * @param {string|null} errorMessage - Error message to display
 * @param {string} field - Field name to show error for
 */
const ErrorMessage = (errorMessage, field) => {
    const showMessage = document.querySelector(`[name="${field}"]`).parentElement;
    const InputError = document.querySelector(`[name="${field}"]`);
    if (errorMessage) {
        showMessage.setAttribute('data-error', errorMessage);
        showMessage.setAttribute('data-error-visible', true);
        InputError.setAttribute('aria-invalid', true);
    } else {
        showMessage.removeAttribute('data-error');
        showMessage.removeAttribute('data-error-visible');
        InputError.setAttribute('aria-invalid', false);
    }
};

/**
 * Displays success message and handles form reset
 * @param {HTMLFormElement} form - The form element to reset
 */
const showSucessMessage = (form) => {
    const successMessage = document.querySelector('.form-success');
    form.reset();
    successMessage.style.display = 'block'

    setTimeout(() => {
        document.getElementById("contact_modal").style.display = ''
        successMessage.style.display = 'none'
        form.style.display = 'block'
    }, 2000);
};

/**
 * Initializes the contact form functionality
 * @param {Object} photographer - The photographer object
 */
export const contactForm = (photographer) => {
    submitForm()
    inputForm()
    updateTitleForm(photographer)
}