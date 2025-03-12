import Media from "../models/Media.js";

/**
 * Représente un élément média de type image
 * @class
 * @extends Media
 */
class Image extends Media {
    /**
     * Crée une nouvelle instance d'Image
     * @param {Object} data - Les données de l'image
     * @param {string} [data.image] - Le chemin ou l'URL vers le fichier image
     * @param {string} [data.date] - La date de l'image
     * @param {string} [data.id] - L'identifiant unique de l'image
     * @param {number} [data.likes] - Nombre de likes pour l'image
     * @param {string} [data.photographerId] - ID du photographe qui a créé l'image
     * @param {number} [data.price] - Le prix de l'image
     * @param {string} [data.title] - Le titre de l'image
     * @param {boolean} [data.isLiked] - Indique si l'image est likée par l'utilisateur actuel
     */
    constructor(data) {
        super(data)
        this._image = data.image || 'Undefined'
    }

    /** @returns {string} Le chemin ou l'URL vers le fichier image */
    get image() { 
        return this._image 
    }

    /**
     * Convertit l'instance Image en un objet JavaScript simple
     * @returns {Object} Représentation en objet simple de l'Image
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