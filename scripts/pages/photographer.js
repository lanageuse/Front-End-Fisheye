import Api from '../api/Api.js'
import Photograph from '../models/photograph.js'
import HeaderProfile from '../templates/HeaderProfile.js'
import Gallery from '../templates/Gallery.js'

class PhotographerPage {
    constructor(id) {
        this.id = Number(id) || 'undefined'
        this.profile = []
        this.gallery = []
        this.api = new Api('./data/photographers.json')
        this.$wrapperProfile = document.querySelector('.photograph-header')
        this.$wrapperGallery = document.querySelector('.gallery-container')
        this.$wrapperWidget = document.querySelector('.widget')
    }
    async getProfile() {
        if(typeof(this.id) !== 'number'){
            throw new Error('ID must have a number')
        }
        const {photographers, media} = await this.api.get()
        const data = photographers.filter(profile => profile.id === this.id)
        this.profile = new Photograph(data[0])
        return this.profile
    }
    async displayProfile(){
        const Template = new HeaderProfile(this.profile)
        this.$wrapperProfile.innerHTML = Template.createCard()
    }    
    async getMedias() {
        const {photographers, media}= await this.api.get()
        this.gallery = media.filter(media => media.photographerId === this.id)
        return this.gallery
    }
     async displayGallery(){
        const photograph = this.profile
        const medias = this.gallery
        const Template = new Gallery(medias, photograph)
        this.$wrapperGallery.innerHTML = Template.createGallery()
        this.$wrapperWidget.innerHTML = Template.createWidget()
     }
    
    async main() {
        await this.getProfile()
        await this.displayProfile()
        await this.getMedias()
        await this.displayGallery()
        .then( setTimeout(() => this.$wrapperWidget.classList.add('show'), 1000) )
    }

}

const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");
const app = new PhotographerPage(photographId)
app.main()