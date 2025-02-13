import Photograph from "../models/photograph.js"

class HeaderProfile extends Photograph {
    constructor(data) {
        super(data)
    }

    createCard() {
        const header = `
        <div class="photograph-header__details">
        <h2 class="photograph-header__name">${this.name}</h2>
        <p class="photograph-header__location">${this.city}, ${this.country}</p>
        <p class="photograph-header__description">${this.tagline}</p>
      </div>
      <div class="photograph-header__contact"><button class="contact_button">Contactez-moi</button></div>
      <div class="photograph-header__thumb">
        <img src="././assets/photographers/${this.portrait}" class="profile__thumb" alt="Photographe ${this.name}">
      </div>
        `
        return header
    }
    
}
export default HeaderProfile