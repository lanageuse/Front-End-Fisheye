import Media from "../models/Media.js";
class Video extends Media{
    constructor(data){
        super(data)
        this._video = data.video || 'Undefined'
    }
    get video() { return this._video }

}
export default Video