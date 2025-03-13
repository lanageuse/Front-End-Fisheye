import Photograph from "../models/Photograph.js"

/**
 * Composant pour l'affichage de la carte de profil d'un photographe
 * @class
 * @extends Photograph
 */
class CardProfile extends Photograph {
    /**
     * Crée une nouvelle instance de CardProfile
     * @param {Object} data - Les données du photographe
     */
    constructor(data) {
        super(data)
        this.$wrapper = document.createElement('article')
        this.$wrapper.classList.add('profile')
    }

    /**
     * Génère et retourne le HTML pour la carte de profil du photographe
     * @returns {HTMLElement} L'élément complet de la carte de profil
     */
    createCard() {
        const card = `
            <a href="photographer.html?id=${this.id}" aria-label="Voir le profil du photographe ${this.name}">
                <img src="././assets/photographers/${this.portrait}" 
                     class="profile__thumb"
                     alt="${this.name}">
                <h2 class="profile__name">${this.name}</h2>
                <div role="region" aria-labelledby="profileHeader" tabindex="0">
                <h2 id="profileHeader" class="sr-only">Informations sur le photographe</h2>
                <p class="profile__location">${this.city}, ${this.country}</p>
                <p class="profile__description">${this.tagline}</p>
                <p class="profile__dailyRate">${this.price}€/jour</p>
                </div>
            </a>
        `
        this.$wrapper.innerHTML = card
        return this.$wrapper
    }
}

export default CardProfile