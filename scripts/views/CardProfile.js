import Photograph from "../models/photograph.js"

class CardProfile extends Photograph{
    constructor(data){
        super(data)
        this.$wrapper = document.createElement('article')
        this.$wrapper.classList.add('profile')
    }

    createCard(){
        const card = `
        <a href="photographer.html?id=${this.id}">
        <img src="././assets/photographers/${this.portrait}" class="profile__thumb" alt="Photographe ${this.name}">
        <h2 class="profile__name">${this.name}</h2>
        <p class="profile__location">${this.city}, ${this.country}</p>
        <p class="profile__description">${this.tagline}</p>
        <p class="profile__dailyRate">${this.price}€/jour</p>
        </a>
        `
        this.$wrapper.innerHTML = card
        return this.$wrapper
    }

}
export default CardProfile