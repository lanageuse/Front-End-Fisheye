import { FieldValidator, RequiredRule, EmailRule, MinLengthRule } from "./formValidator.js";
// DOM Elements
const form = document.getElementById('submitForm'); //Élément du formulaire principal.

/**
 * Tableau des validateurs pour chaque champ du formulaire.
 * Chaque validateur est associé à un champ par son nom (`fieldName`) et contient des règles de validation.
 * @type {FieldValidator[]}
 */
const validators = [
    new FieldValidator("firstname",
        [
            new MinLengthRule(2, "Vous devez saisir au minimum 2 caractères")
        ]),
    new FieldValidator("lastname",
        [
            new MinLengthRule(2, "Vous devez saisir au minimum 2 caractères")
        ]),
    new FieldValidator("email",
        [
            new EmailRule("Vous devez saisir un email valide")
        ]),
    new FieldValidator("message", 
        [
            new RequiredRule("Ce champ est obligatoire")
        ]
    )
];

/**
 * Ajoute un gestionnaire d'événement `input` pour valider chaque champ individuellement.
 */
const inputForm = () => 
    form.querySelectorAll("input").forEach((field) => {
    field.addEventListener("input", (e) => {
        const value = e.target.value; // Valeur actuelle du champ
        const fieldName = e.target.name; // Nom du champ (attribut `name`)

        // Recherche du validateur correspondant au champ
        const fieldValidator = validators.find(validator => validator.fieldName === fieldName);

        // Si un validateur est trouvé, effectue la validation
        const error = fieldValidator.validate(value);

        // Affiche ou masque le message d'erreur
        ErrorMessage(error, fieldName);
    });
});

/**
 * Ajoute un gestionnaire d'événement `submit` pour valider tout le formulaire avant soumission.
 * Si le formulaire contient des erreurs, on empêche la soumission et on affiche les messages d'erreur.
 */
const submitForm = () => form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValidate = true; // Variable pour suivre l'état de validation du formulaire

    // Récupère les données du formulaire sous forme d'objet clé/valeur
    const formSubmit = new FormData(e.target);

    // Convertit formSubmit en objet clé/valeur pour une manipulation plus simple
    const formData = Object.fromEntries(formSubmit.entries());

    // Valide chaque champ avec son validateur associé
    for (const validator of validators) {
        const error = validator.validate(formData[validator.fieldName]); // Valide le champ

        // Affiche ou masque le message d'erreur pour le champ
        ErrorMessage(error, validator.fieldName);

        // Si une erreur est détectée, le formulaire n'est pas valide
        if (error) {
            isValidate = false;
        }
    }

    // Si tout est valide, affiche un message de succès
    if (isValidate) {
        showSucessMessage(form);
    }
});


const updateTitleForm = (photographer) => {
    const $title = document.getElementById("modalTitle")
    $title.innerHTML += `<br/> ${photographer.name}`
}


/**
 * Gère l'affichage des messages d'erreur pour un champ spécifique.
 * Ajoute ou supprime les attributs `data-error` et `data-error-visible` pour indiquer l'état de validation.
 *
 * @param {string|null} errorMessage - Le message d'erreur à afficher (null si aucune erreur).
 * @param {string} field - Le nom du champ (attribut `name`) pour lequel le message d'erreur s'applique.
 */
const ErrorMessage = (errorMessage, field) => {
    // Sélectionne le conteneur parent du champ spécifié
    const showMessage = document.querySelector(`[name="${field}"]`).parentElement;
    const InputError = document.querySelector(`[name="${field}"]`);
    if (errorMessage) {
        // Affiche le message d'erreur en tant qu'attribut et marque l'erreur comme visible
        showMessage.setAttribute('data-error', errorMessage);
        showMessage.setAttribute('data-error-visible', true);
        InputError.setAttribute('aria-invalid', true);
    } else {
        // Supprime les attributs liés à l'erreur si le champ est valide
        showMessage.removeAttribute('data-error');
        showMessage.removeAttribute('data-error-visible');
        InputError.setAttribute('aria-invalid', false);
    }
};

/**
 * Affiche un message de succès après la soumission réussie du formulaire.
 * Réinitialise le formulaire, affiche un message de succès pendant 5 secondes,
 * puis ferme la modale et masque le message.
 *
 * @param {HTMLFormElement} form - Le formulaire à réinitialiser après soumission.
 */
const showSucessMessage = (form) => {
    // Sélectionne l'élément qui affiche le message de succés
    const successMessage = document.querySelector('.form-success');
    // Réinitialise le formulaire pour effacer les données saisies
    form.reset();
    // Rendre le message de succès visible
    successMessage.style.display = 'block'

    // // Masque le message et ferme la modale après 2 secondes
    setTimeout(() => {
        document.getElementById("contact_modal").style.display = ''
        successMessage.style.display = 'none'
        form.style.display = 'block'
    }, 2000);
};

export const contactForm = (photographer) => {
    submitForm()
    inputForm()
    updateTitleForm(photographer)
}
