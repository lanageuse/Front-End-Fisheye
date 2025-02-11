class Photograph {
    constructor({name, id, city, country, tagline, price, portrait}) {
        this._name = name || 'undefined'
        this._id = id || 'undefined'
        this._city = city || 'undefined'
        this._country = country || 'undefined'
        this._tagline = tagline || 'undefined'
        this._price = price || 'undefined'
        this._portrait = portrait || 'undefined'
    }

    get name() { return this._name }
    get id() { return this._id }
    get id() { return this._id }
    get city(){ return this._city}
    get country(){ return this._country}
    get tagline(){ return this._tagline}
    get price(){ return this._price}
    get portrait(){ return this._portrait}
}

export default Photograph
