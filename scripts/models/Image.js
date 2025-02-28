import Media from "../models/Media.js";

/**
 * Represents an image media item
 * @class
 * @extends Media
 */
class Image extends Media {
    /**
     * Creates a new Image instance
     * @param {Object} data - The image data
     * @param {string} [data.image] - The path or URL to the image file
     * @param {string} [data.date] - The date of the image
     * @param {string} [data.id] - The image's unique identifier
     * @param {number} [data.likes] - Number of likes for the image
     * @param {string} [data.photographerId] - ID of the photographer who created the image
     * @param {number} [data.price] - The price of the image
     * @param {string} [data.title] - The title of the image
     * @param {boolean} [data.isLiked] - Whether the image is liked by the current user
     */
    constructor(data) {
        super(data)
        this._image = data.image || 'Undefined'
    }

    /** @returns {string} The path or URL to the image file */
    get image() { 
        return this._image 
    }

    /**
     * Converts the Image instance to a plain JavaScript object
     * @returns {Object} Plain object representation of the Image
     */
    toJSON() {
        return {
            date: this._date,
            id: this._id,
            likes: this._likes,
            photographerId: this._photographerId,
            price: this._price,
            title: this._title,
            isLiked: false,
            image: this._image
        }
    }
}

export default Image