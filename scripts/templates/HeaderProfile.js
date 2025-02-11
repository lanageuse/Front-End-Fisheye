import Photograph from "../models/photograph.js"

class HeaderProfile extends Photograph {
    constructor(data) {
        super(data)
        this.$wrapper = document.querySelector('.photograph-header')
    }

    createCard() {
        const header = `
        <div class="photograph-header__details">
        <h2 class="photograph-header__name">${this.name}</h2>
        <p class="photograph-header__location">${this.city}, ${this.country}</p>
        <p class="photograph-header__description">${this.tagline}</p>
      </div>
      <div class="photograph-header__contact"><button class="contact_button" onclick="displayModal()">Contactez-moi</button></div>
      <div class="photograph-header__thumb">
        <img src="././assets/photographers/${this.portrait}" class="profile__thumb" alt="Photographe ${this.name}">
      </div>
        `
        this.$wrapper.innerHTML = header
        return this.$wrapper
    }

}
export default HeaderProfile