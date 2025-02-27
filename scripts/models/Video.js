import Media from "../models/Media.js";
class Video extends Media{
    constructor(data){
        super(data)
        this._video = data.video || 'Undefined'
    }
    get video() { return this._video }
    toJSON() {
        return {
         "date" : this._name,
         "id" : this._id,
         "likes" : this._likes,
         "photographerId" : this._photographerId,
         "price" : this._price,
         "title" : this._title,
         "isLiked" : false,
         "video" : this._video
        }
     }
}
export default Video