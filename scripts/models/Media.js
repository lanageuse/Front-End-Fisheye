/**
 * Represents a media item in the application
 * @class
 */
class Media {
    /**
     * Creates a new Media instance
     * @param {Object} params - The media parameters
     * @param {string} [params.date] - The date of the media
     * @param {string} [params.id] - The media's unique identifier
     * @param {number} [params.likes] - Number of likes for the media
     * @param {string} [params.photographerId] - ID of the photographer who created the media
     * @param {number} [params.price] - The price of the media
     * @param {string} [params.title] - The title of the media
     * @param {boolean} [params.isLiked] - Whether the media is liked by the current user
     */
    constructor({ date, id, likes, photographerId, price, title, isLiked }) {
        this._date = date || 'Undefined'
        this._id = id || 'Undefined'
        this._likes = likes || 'Undefined'
        this._photographerId = photographerId || 'Undefined'
        this._price = price || 'Undefined'
        this._title = title || 'Undefined'
        this._isLiked = isLiked
    }

    /** @returns {string} The date of the media */
    get date() { return this._date }
    
    /** @returns {string} The media's unique identifier */
    get id() { return this._id }
    
    /** @returns {number} Number of likes for the media */
    get likes() { return this._likes }
    
    /** @returns {string} ID of the photographer who created the media */
    get photographerId() { return this._photographerId }
    
    /** @returns {number} The price of the media */
    get price() { return this._price }
    
    /** @returns {string} The title of the media */
    get title() { return this._title }
    
    /** @returns {boolean} Whether the media is liked by the current user */
    get isLiked() { return this._isLiked }
}

export default Media