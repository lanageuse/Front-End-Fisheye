// Import des modules requis
import Api from '../api/Api.js'
import Photograph from '../models/Photograph.js'
import HeaderProfile from '../templates/HeaderProfile.js'
import FactoryMedia from '../factories/FactoryMedia.js'
import Gallery from '../templates/Gallery.js'
import { handleLikes } from '../utils/likes.js'
import openCloseModal from '../utils/modal.js'
import { contactForm } from '../utils/contactForm.js'
import { handleFilter } from '../utils/filter.js'
import { displayLightbox } from '../utils/lightbox.js'
import { videoHover } from '../utils/video.js'

// Récupération de l'ID du photographe depuis les paramètres URL
const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");

/**
 * Contrôle les fonctionnalités de la page du photographe, incluant l'affichage du profil et la galerie média
 * @class
 */
class PhotographerPage {
    /**
     * Crée une nouvelle instance de PhotographerPage
     * @param {string|number} id - L'ID du photographe
     */
    constructor(id) {
        this.id = Number(id) || 'undefined'
        this.profile = []
        this.gallery = []
        this.api = new Api('./data/photographers.json')
        this.$wrapperProfile = document.querySelector('.photograph-header')
        this.$wrapperGallery = document.querySelector('.gallery-container')
        this.$wrapperWidget = document.querySelector('.widget')
        this.dataLocal = localStorage.getItem(`${this.id}`) || null
    }

    /**
     * Récupère et définit les données du profil du photographe
     * @async
     * @throws {Error} Si l'ID n'est pas un nombre
     * @returns {Promise<Photograph>} Les données du profil du photographe
     */
    async getProfile() {
        if (typeof (this.id) !== 'number') {
            throw new Error('L\'ID doit être un nombre')
        }
        const { photographers } = await this.api.get()
        const data = photographers.filter(profile => profile.id === this.id)
        this.profile = new Photograph(data[0])
        return this.profile
    }

    /**
     * Affiche le profil du photographe dans le DOM
     * @async
     */
    async displayProfile() {
        const Template = new HeaderProfile(this.profile)
        this.$wrapperProfile.innerHTML = Template.createCard()
        document.title = Template.updateTitle()
    }

    /**
     * Récupère et définit la galerie média du photographe
     * Essaie d'abord de charger depuis le localStorage, sinon utilise l'API
     * @async
     * @returns {Promise<Array>} Tableau des éléments média
     */
    async getGallery() {
        if (this.dataLocal) {
            const media = JSON.parse(this.dataLocal)
            this.gallery = media.map(media => new FactoryMedia(media))
            .filter(media => media.photographerId === this.id)
        } else {
            const { media } = await this.api.get()
            this.gallery = media.map(media => new FactoryMedia(media))
            .filter(media => media.photographerId === this.id)
            this.saveGallery(this.id, this.gallery)
        }
        return this.gallery
    }

    /**
     * Sauvegarde les données de la galerie dans le localStorage
     * @param {string|number} item - Clé pour le localStorage
     * @param {Array} data - Données de la galerie à sauvegarder
     */
    saveGallery(item, data){
        localStorage.setItem(item, JSON.stringify(data))
    }

    /**
     * Affiche la galerie média et le widget dans le DOM
     * @async
     * @param {Array} [sortedGallery=null] - Tableau de la galerie pré-triée optionnel
     */
    async displayGallery(sortedGallery = null) {
        const photograph = this.profile
        const medias = sortedGallery || this.gallery
        const Template = new Gallery(medias, photograph)
        this.$wrapperGallery.innerHTML = Template.createGallery()
        this.$wrapperWidget.innerHTML = Template.createWidget()
    }

    /**
     * Initialise la page en chargeant les données et en configurant les gestionnaires d'événements
     * @async
     */
    async main() {
        // Chargement et affichage du profil du photographe
        await this.getProfile()
        await this.displayProfile()

        // Chargement et affichage de la galerie média
        await this.getGallery()
        await this.displayGallery().then(setTimeout(() => this.$wrapperWidget.classList.add('show'), 1000))

        // Initialisation de la fonctionnalité des likes
        await handleLikes()

        // Configuration des interactions UI
        openCloseModal()
        contactForm(this.profile);

        // Initialisation du filtrage et des fonctionnalités d'affichage média
        handleFilter(this.gallery, (sortedGallery) => this.displayGallery(sortedGallery), this.profile)

        displayLightbox(this.gallery, this.profile)
        videoHover()
    }
}

// Initialisation de l'application
const app = new PhotographerPage(photographId)
app.main()