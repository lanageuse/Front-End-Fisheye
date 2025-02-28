/**
 * Represents a Photographer's profile information
 * @class
 */
class Photograph {
    /**
     * Creates a new Photograph instance
     * @param {Object} params - The photographer parameters
     * @param {string} [params.name] - The photographer's name
     * @param {string} [params.id] - The photographer's unique identifier
     * @param {string} [params.city] - The photographer's city
     * @param {string} [params.country] - The photographer's country
     * @param {string} [params.tagline] - The photographer's tagline or slogan
     * @param {number} [params.price] - The photographer's price rate
     * @param {string} [params.portrait] - URL or path to the photographer's portrait image
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

    /** @returns {string} The photographer's name */
    get name() { return this._name }
    /** @returns {string} The photographer's unique identifier */
    get id() { return this._id }
    /** @returns {string} The photographer's city */
    get city() { return this._city }
    /** @returns {string} The photographer's country */
    get country() { return this._country }
    /** @returns {string} The photographer's tagline or slogan */
    get tagline() { return this._tagline }
    /** @returns {number} The photographer's price rate */
    get price() { return this._price }
    /** @returns {string} URL or path to the photographer's portrait image */
    get portrait() { return this._portrait }

    /**
     * Converts the Photograph instance to a plain JavaScript object
     * @returns {Object} Plain object representation of the Photograph
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