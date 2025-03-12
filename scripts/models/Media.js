/**
 * Représente un élément média dans l'application
 * @class
 */
class Media {
    /**
     * Crée une nouvelle instance de Media
     * @param {Object} params - Les paramètres du média
     * @param {string} [params.date] - La date du média
     * @param {string} [params.id] - L'identifiant unique du média
     * @param {number} [params.likes] - Nombre de likes pour le média
     * @param {string} [params.photographerId] - ID du photographe qui a créé le média
     * @param {number} [params.price] - Le prix du média
     * @param {string} [params.title] - Le titre du média
     * @param {boolean} [params.isLiked] - Indique si le média est liké par l'utilisateur actuel
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

    /** @returns {string} La date du média */
    get date() { return this._date }
    
    /** @returns {string} L'identifiant unique du média */
    get id() { return this._id }
    
    /** @returns {number} Nombre de likes pour le média */
    get likes() { return this._likes }
    
    /** @returns {string} ID du photographe qui a créé le média */
    get photographerId() { return this._photographerId }
    
    /** @returns {number} Le prix du média */
    get price() { return this._price }
    
    /** @returns {string} Le titre du média */
    get title() { return this._title }
    
    /** @returns {boolean} Indique si le média est liké par l'utilisateur actuel */
    get isLiked() { return this._isLiked }
}

export default Media