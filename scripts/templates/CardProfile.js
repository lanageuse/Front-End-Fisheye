import Photograph from "../models/Photograph.js"

/**
 * Component for rendering a photographer's profile card
 * @class
 * @extends Photograph
 */
class CardProfile extends Photograph {
    /**
     * Creates a new CardProfile instance
     * @param {Object} data - The photographer's data
     */
    constructor(data) {
        super(data)
        this.$wrapper = document.createElement('article')
        this.$wrapper.classList.add('profile')
    }

    /**
     * Generates and returns the HTML for the photographer's profile card
     * @returns {HTMLElement} The complete profile card element
     */
    createCard() {
        const card = `
            <a href="photographer.html?id=${this.id}" aria-label="Voir le profil du photographe ${this.name}">
                <img src="././assets/photographers/${this.portrait}" 
                     class="profile__thumb" 
                     alt="">
                <h2 class="profile__name">${this.name}</h2>
            </a>
            <p class="profile__location">${this.city}, ${this.country}</p>
            <p class="profile__description">${this.tagline}</p>
            <p class="profile__dailyRate">${this.price}€/jour</p>
        `
        this.$wrapper.innerHTML = card
        return this.$wrapper
    }
}

export default CardProfile