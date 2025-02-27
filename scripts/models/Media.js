class Media {
    constructor({ date, id, likes, photographerId, price, title, isLiked }) {
        this._date = date || 'Undefined'
        this._id = id || 'Undefined'
        this._likes = likes || 'Undefined'
        this._photographerId = photographerId || 'Undefined'
        this._price = price || 'Undefined'
        this._title = title || 'Undefined'
        this._isLiked = isLiked
    }

    get date() { return this._date }
    get id() { return this._id }
    get likes() { return this._likes }
    get photographerId() { return this._photographerId }
    get price() { return this._price }
    get title() { return this._title }
    get isLiked(){ return this._isLiked }
}

export default Media
