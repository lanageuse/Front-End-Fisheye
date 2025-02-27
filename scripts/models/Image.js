import Media from "../models/Media.js";
class Image extends Media{
    constructor(data){
        super(data)
        this._image = data.image || 'Undefined'
    }
    get image() { return this._image }


    toJSON() {
        return {
         "date" : this._name,
         "id" : this._id,
         "likes" : this._likes,
         "photographerId" : this._photographerId,
         "price" : this._price,
         "title" : this._title,
         "isLiked" : false,
         "image" : this._image
        }
     }
}
export default Image