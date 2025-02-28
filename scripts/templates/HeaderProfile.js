import Photograph from "../models/Photograph.js"
/**
 * Component for rendering a photographer's profile header
 * @class
 * @extends Photograph
 */
class HeaderProfile extends Photograph {
    /**
     * Creates a new HeaderProfile instance
     * @param {Object} data - The photographer's data
     */
    constructor(data) {
        super(data)
    }

    /**
     * Updates the page title with photographer's name
     * @returns {string} The formatted page title
     */
    updateTitle() {
        return `Fisheye - Découvrez les créations de ${this.name}`
    }

    /**
     * Generates HTML for the photographer's header section
     * @returns {string} HTML string for the header section
     */
    createCard() {
        const header = `
            <div class="photograph-header__details">
                <h1 class="photograph-header__name" tabindex="0">${this.name}</h1>
                <div class="photograph-header__location" tabindex="0">${this.city}, ${this.country}</div>
                <div class="photograph-header__description" tabindex="0">${this.tagline}</div>
            </div>
            <div class="photograph-header__contact">
                <button class="contact_button" aria-label="Bouton pour contacter ${this.name}">
                    Contactez-moi
                </button>
            </div>
            <div class="photograph-header__thumb" tabindex="0">
                <img src="././assets/photographers/${this.portrait}" 
                     class="profile__thumb" 
                     alt="${this.name}">
            </div>
        `
        return header
    }
}

export default HeaderProfile