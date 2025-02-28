import Video from '../models/Video.js'
import Image from '../models/Image.js'
/**
 * Factory class for creating different types of media objects
 * @class
 */
class FactoryMedia {
    /**
     * Creates a new media object based on the provided data
     * @param {Object} data - The media data
     * @param {string} [data.image] - Path to image file (if media is an image)
     * @param {string} [data.video] - Path to video file (if media is a video)
     * @param {string} data.date - Creation date of the media
     * @param {string|number} data.id - Unique identifier for the media
     * @param {number} data.likes - Number of likes on the media
     * @param {string|number} data.photographerId - ID of the photographer who created the media
     * @param {number} data.price - Price of the media
     * @param {string} data.title - Title of the media
     * @returns {Image|Video} A new Image or Video instance
     */
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw new Error('Invalid media type')
        }
    }
}

export default FactoryMedia