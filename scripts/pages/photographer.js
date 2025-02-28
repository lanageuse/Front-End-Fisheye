// Import required modules
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

// Get photographer ID from URL parameters
const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");

/**
 * Controls the photographer's page functionality including profile display and media gallery
 * @class
 */
class PhotographerPage {
    /**
     * Creates a new PhotographerPage instance
     * @param {string|number} id - The photographer's ID
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
     * Fetches and sets the photographer's profile data
     * @async
     * @throws {Error} If ID is not a number
     * @returns {Promise<Photograph>} The photographer's profile data
     */
    async getProfile() {
        if (typeof (this.id) !== 'number') {
            throw new Error('ID must have a number')
        }
        const { photographers } = await this.api.get()
        const data = photographers.filter(profile => profile.id === this.id)
        this.profile = new Photograph(data[0])
        return this.profile
    }

    /**
     * Renders the photographer's profile in the DOM
     * @async
     */
    async displayProfile() {
        const Template = new HeaderProfile(this.profile)
        this.$wrapperProfile.innerHTML = Template.createCard()
        document.title = Template.updateTitle()
    }

    /**
     * Fetches and sets the photographer's media gallery
     * Tries to load from localStorage first, falls back to API
     * @async
     * @returns {Promise<Array>} Array of media items
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
     * Saves gallery data to localStorage
     * @param {string|number} item - Key for localStorage
     * @param {Array} data - Gallery data to save
     */
    saveGallery(item, data){
        localStorage.setItem(item, JSON.stringify(data))
    }

    /**
     * Renders the media gallery and widget in the DOM
     * @async
     * @param {Array} [sortedGallery=null] - Optional pre-sorted gallery array
     */
    async displayGallery(sortedGallery = null) {
        const photograph = this.profile
        const medias = sortedGallery || this.gallery
        const Template = new Gallery(medias, photograph)
        this.$wrapperGallery.innerHTML = Template.createGallery()
        this.$wrapperWidget.innerHTML = Template.createWidget()
    }

    /**
     * Initializes the page by loading data and setting up event handlers
     * @async
     */
    async main() {
        // Load and display photographer profile
        await this.getProfile()
        await this.displayProfile()

        // Load and display media gallery
        await this.getGallery()
        await this.displayGallery().then(setTimeout(() => this.$wrapperWidget.classList.add('show'), 1000))

        // Initialize likes functionality
        await handleLikes()

        // Set up UI interactions
        openCloseModal()
        contactForm(this.profile);

        // Initialize filtering and media display features
        handleFilter(this.gallery, (sortedGallery) => this.displayGallery(sortedGallery), this.profile)

        displayLightbox(this.gallery, this.profile)
        videoHover()
    }
}

// Initialize the application
const app = new PhotographerPage(photographId)
app.main()