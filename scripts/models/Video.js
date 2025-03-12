/**
 * Représente les informations du profil d'un Photographe
 * @class
 */
class Photograph {
    /**
     * Crée une nouvelle instance de Photograph
     * @param {Object} params - Les paramètres du photographe
     * @param {string} [params.name] - Le nom du photographe
     * @param {string} [params.id] - L'identifiant unique du photographe
     * @param {string} [params.city] - La ville du photographe
     * @param {string} [params.country] - Le pays du photographe
     * @param {string} [params.tagline] - La signature ou le slogan du photographe
     * @param {number} [params.price] - Le tarif du photographe
     * @param {string} [params.portrait] - URL ou chemin vers l'image de portrait du photographe
     */
    constructor({ name, id, city, country, tagline, price, portrait }) {
        this._name = name || 'undefined'
        this._id = id || 'undefined'
        this._city = city || 'undefined'
        this._country = country || 'undefined'
        this._tagline = tagline || 'undefined'
        this._price = price || 'undefined'
        this._portrait = portrait || 'undefined'
    }

    /** @returns {string} Le nom du photographe */
    get name() { return this._name }
    /** @returns {string} L'identifiant unique du photographe */
    get id() { return this._id }
    /** @returns {string} La ville du photographe */
    get city() { return this._city }
    /** @returns {string} Le pays du photographe */
    get country() { return this._country }
    /** @returns {string} La signature ou le slogan du photographe */
    get tagline() { return this._tagline }
    /** @returns {number} Le tarif du photographe */
    get price() { return this._price }
    /** @returns {string} URL ou chemin vers l'image de portrait du photographe */
    get portrait() { return this._portrait }

    /**
     * Convertit l'instance Photograph en un objet JavaScript simple
     * @returns {Object} Représentation en objet simple du Photograph
     */
    toJSON() {
       return {
        "name" : this._name,
        "id" : this._id,
        "city" : this._city,
        "country" : this._country,
        "tagline" : this._tagline,
        "price" : this._price,
        "portrait" : this._portrait
       }
    }
}

export default Photograph