import Photograph from "../models/photograph.js"

class CardProfil extends Photograph{
    constructor(data){
        super(data)
        this.$wrapper = document.createElement('article')
        this.$wrapper.classList.add('profile')
    }

    createCard(){
        const card = `
        <img src="././assets/photographers/${this.portrait}" class="thumb" alt="Photographe ${this.name}">
        <h2 class="profile__name">${this.name}</h2>
        <p class="profile__location">${this.city}, ${this.country}</p>
        <p class="profile__description">${this.tagline}</p>
        <p class="profile__dailyRate">${this.price}€/jour</p>
        `
        this.$wrapper.innerHTML = card
        return this.$wrapper
    }

}
export default CardProfil