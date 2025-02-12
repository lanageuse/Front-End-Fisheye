import Media from "../models/Media.js";
class Image extends Media{
    constructor(data){
        super(data)
        this._image = data.image || 'Undefined'
    }
    get image() { return this._image }
}
export default Image