import Photograph from "../models/Photograph.js"
/**
 * Composant pour l'affichage de l'en-tête du profil d'un photographe
 * @class
 * @extends Photograph
 */
class HeaderProfile extends Photograph {
    /**
     * Crée une nouvelle instance de HeaderProfile
     * @param {Object} data - Les données du photographe
     */
    constructor(data) {
        super(data)
    }

    /**
     * Met à jour le titre de la page avec le nom du photographe
     * @returns {string} Le titre formaté de la page
     */
    updateTitle() {
        return `Fisheye - Découvrez les créations de ${this.name}`
    }

    /**
     * Génère le HTML pour la section d'en-tête du photographe
     * @returns {string} Chaîne HTML pour la section d'en-tête
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