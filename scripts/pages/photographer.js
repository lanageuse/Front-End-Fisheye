import Api from '../api/Api.js'
import Photograph from '../models/Photograph.js'
import HeaderProfile from '../templates/HeaderProfile.js'
import Gallery from '../templates/Gallery.js'
import { handleLikes } from '../utils/likes.js'
import openCloseModal from '../utils/modal.js'
import { contactForm } from '../utils/contactForm.js'
import { handleFilter } from '../utils/filter.js'
import { displayLightbox } from '../utils/lightbox.js'
import { videoHover } from '../utils/video.js'

const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");
class PhotographerPage {
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
    async getProfile() {
        if (typeof (this.id) !== 'number') {
            throw new Error('ID must have a number')
        }
        const { photographers } = await this.api.get()
        const data = photographers.filter(profile => profile.id === this.id)
        this.profile = new Photograph(data[0])
        return this.profile
    }
    async displayProfile() {
        const Template = new HeaderProfile(this.profile)
        this.$wrapperProfile.innerHTML = Template.createCard()
    }
    async getGallery() {
        if (this.dataLocal) {
            const media = JSON.parse(this.dataLocal)
            this.gallery = media.filter(media => media.photographerId === this.id)
        } else {
            const { media } = await this.api.get()
            this.gallery = media.filter(media => media.photographerId === this.id)
            this.saveGallery(this.id, this.gallery)
        }
        return this.gallery
    }

    saveGallery(item, data){
        localStorage.setItem(item, JSON.stringify(data))
    }

    async displayGallery(sortedGallery = null) {
        const photograph = this.profile
        const medias = sortedGallery || this.gallery
        const Template = new Gallery(medias, photograph)
        this.$wrapperGallery.innerHTML = Template.createGallery()
        this.$wrapperWidget.innerHTML = Template.createWidget()
    }

    async main() {
        await this.getProfile()
        await this.displayProfile()

        await this.getGallery()
        await this.displayGallery().then(setTimeout(() => this.$wrapperWidget.classList.add('show'), 1000))

        await handleLikes()

        openCloseModal()
        contactForm(this.profile);

        handleFilter(this.gallery, (sortedGallery) => this.displayGallery(sortedGallery), this.profile)

        displayLightbox(this.gallery, this.profile)
        videoHover()
    }
}

const app = new PhotographerPage(photographId)
app.main()