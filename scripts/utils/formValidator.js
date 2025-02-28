/**
 * Base class for form field validation rules
 * @class
 */
class FieldRuleValidator {
    /**
     * Creates a validation rule
     * @param {string} errorMessage - Error message to display if validation fails
     */
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    /**
     * Base validate method that must be implemented by child classes
     * @throws {Error} Throws an error if validate method is not implemented
     */
    validate() {
        throw new Error("The 'validate' method must be implemented");
    }
}

/**
 * Validates required fields
 * @class
 * @extends FieldRuleValidator
 */
export class RequiredRule extends FieldRuleValidator {
    /**
     * Validates that value is not empty or only whitespace
     * @param {string} value - Value to validate
     * @returns {boolean} True if value is valid
     */
    validate(value) {
        return value && value.trim() !== "";
    }
}

/**
 * Validates email format
 * @class
 * @extends FieldRuleValidator
 */
export class EmailRule extends FieldRuleValidator {
    /**
     * Validates email format using regex
     * @param {string} value - Email to validate
     * @returns {boolean} True if email format is valid
     */
    validate(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }
}

/**
 * Validates minimum length requirement
 * @class
 * @extends FieldRuleValidator
 */
export class MinLengthRule extends FieldRuleValidator {
    /**
     * Creates a minimum length validation rule
     * @param {number} minLength - Minimum required length
     * @param {string} errorMessage - Error message to display
     */
    constructor(minLength, errorMessage) {
        super(errorMessage)
        this.minLength = minLength
    }

    /**
     * Validates minimum length requirement
     * @param {string} value - Value to validate
     * @returns {boolean} True if length meets requirement
     */
    validate(value) {
        return value.length >= this.minLength;
    }
}

/**
 * Validates numeric values
 * @class
 * @extends FieldRuleValidator
 */
export class NumericRule extends FieldRuleValidator {
    /**
     * Validates that value is a valid number
     * @param {string} value - Value to validate
     * @returns {boolean} True if value is a valid number
     */
    validate(value) {
        const parsedValue = Number(value);
        return !isNaN(parsedValue);
    }
}

/**
 * Manages validation rules for a form field
 * @class
 */
export class FieldValidator {
    /**
     * Creates a field validator with specified rules
     * @param {string} fieldName - Name of field to validate
     * @param {FieldRuleValidator[]} rules - Array of validation rules
     */
    constructor(fieldName, rules = []) {
        this.fieldName = fieldName;
        this.rules = rules;
    }

    /**
     * Validates field value against all rules
     * @param {string} value - Value to validate
     * @returns {string|null} Error message or null if valid
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