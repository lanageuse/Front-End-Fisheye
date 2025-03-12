/**
 * Gestionnaire de validation et de soumission du formulaire de contact
 * Implémente les règles de validation et gère le processus de soumission du formulaire
 */

import { FieldValidator, RequiredRule, EmailRule, MinLengthRule } from "./formValidator.js";

const form = document.getElementById('submitForm');

/**
 * Configuration des validateurs des champs du formulaire
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
 * Configure la validation en temps réel pour les champs de saisie du formulaire
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
 * Gère la soumission et la validation du formulaire
 * Empêche la soumission si la validation échoue
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
        formSubmit.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
    }
});

/**
 * Met à jour le titre du formulaire avec le nom du photographe
 * @param {Object} photographer - L'objet photographe
 */
const updateTitleForm = (photographer) => {
    const $title = document.getElementById("modalTitle")
    $title.innerHTML += `<br/> ${photographer.name}`
}

/**
 * Gère l'affichage des messages d'erreur pour les champs du formulaire
 * @param {string|null} errorMessage - Message d'erreur à afficher
 * @param {string} field - Nom du champ pour lequel afficher l'erreur
 */
const ErrorMessage = (errorMessage, field) => {
    const showMessage = document.querySelector(`[name="${field}"]`).parentElement;
    const InputError = document.querySelector(`[name="${field}"]`);
    if (errorMessage) {
        showMessage.setAttribute('data-error', errorMessage);
        showMessage.setAttribute('data-error-visible', true);
        InputError.setAttribute('aria-invalid', true);
        showMessage.setAttribute("role", "alert");
    } else {
        showMessage.removeAttribute('data-error');
        showMessage.removeAttribute('data-error-visible');
        InputError.setAttribute('aria-invalid', false);
        showMessage.removeAttribute("role");
    }
};

/**
 * Affiche le message de succès et gère la réinitialisation du formulaire
 * @param {HTMLFormElement} form - L'élément formulaire à réinitialiser
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
 * Initialise les fonctionnalités du formulaire de contact
 * @param {Object} photographer - L'objet photographe
 */
export const contactForm = (photographer) => {
    submitForm()
    inputForm()
    updateTitleForm(photographer)
}