import Media from "../models/Media.js";

/**
 * Represents a video media item in the application
 * @class
 * @extends Media
 */
class Video extends Media {
    /**
     * Creates a new Video instance
     * @param {Object} data - The video data
     * @param {string} [data.video] - The path or URL to the video file
     * @param {string} [data.date] - The date of the video
     * @param {string} [data.id] - The video's unique identifier
     * @param {number} [data.likes] - Number of likes for the video
     * @param {string} [data.photographerId] - ID of the photographer who created the video
     * @param {number} [data.price] - The price of the video
     * @param {string} [data.title] - The title of the video
     * @param {boolean} [data.isLiked] - Whether the video is liked by the current user
     */
    constructor(data) {
        super(data)
        this._video = data.video || 'Undefined'
    }

    /** @returns {string} The path or URL to the video file */
    get video() { 
        return this._video 
    }

    /**
     * Converts the Video instance to a plain JavaScript object
     * @returns {Object} Plain object representation of the Video
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
            video: this._video
        }
    }
}

export default Video