/**
 * Classe de base pour les règles de validation des champs de formulaire
 * @class
 */
class FieldRuleValidator {
    /**
     * Crée une règle de validation
     * @param {string} errorMessage - Message d'erreur à afficher si la validation échoue
     */
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    /**
     * Méthode de validation de base qui doit être implémentée par les classes enfants
     * @throws {Error} Lance une erreur si la méthode validate n'est pas implémentée
     */
    validate() {
        throw new Error("La méthode 'validate' doit être implémentée");
    }
}

/**
 * Valide les champs obligatoires
 * @class
 * @extends FieldRuleValidator
 */
export class RequiredRule extends FieldRuleValidator {
    /**
     * Vérifie que la valeur n'est pas vide ou composée uniquement d'espaces
     * @param {string} value - Valeur à valider
     * @returns {boolean} Vrai si la valeur est valide
     */
    validate(value) {
        return value && value.trim() !== "";
    }
}

/**
 * Valide le format d'email
 * @class
 * @extends FieldRuleValidator
 */
export class EmailRule extends FieldRuleValidator {
    /**
     * Valide le format d'email en utilisant une expression régulière
     * @param {string} value - Email à valider
     * @returns {boolean} Vrai si le format d'email est valide
     */
    validate(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }
}

/**
 * Valide la longueur minimale requise
 * @class
 * @extends FieldRuleValidator
 */
export class MinLengthRule extends FieldRuleValidator {
    /**
     * Crée une règle de validation de longueur minimale
     * @param {number} minLength - Longueur minimale requise
     * @param {string} errorMessage - Message d'erreur à afficher
     */
    constructor(minLength, errorMessage) {
        super(errorMessage)
        this.minLength = minLength
    }

    /**
     * Valide l'exigence de longueur minimale
     * @param {string} value - Valeur à valider
     * @returns {boolean} Vrai si la longueur respecte l'exigence
     */
    validate(value) {
        return value.length >= this.minLength;
    }
}

/**
 * Valide les valeurs numériques
 * @class
 * @extends FieldRuleValidator
 */
export class NumericRule extends FieldRuleValidator {
    /**
     * Vérifie que la valeur est un nombre valide
     * @param {string} value - Valeur à valider
     * @returns {boolean} Vrai si la valeur est un nombre valide
     */
    validate(value) {
        const parsedValue = Number(value);
        return !isNaN(parsedValue);
    }
}

/**
 * Gère les règles de validation pour un champ de formulaire
 * @class
 */
export class FieldValidator {
    /**
     * Crée un validateur de champ avec des règles spécifiées
     * @param {string} fieldName - Nom du champ à valider
     * @param {FieldRuleValidator[]} rules - Tableau des règles de validation
     */
    constructor(fieldName, rules = []) {
        this.fieldName = fieldName;
        this.rules = rules;
    }

    /**
     * Valide la valeur du champ selon toutes les règles
     * @param {string} value - Valeur à valider
     * @returns {string|null} Message d'erreur ou null si valide
     */
    validate(value) {
        for (const rule of this.rules) {
            if (!rule.validate(value)) {
                return rule.errorMessage;
            }
        }
        return null;
    }
}