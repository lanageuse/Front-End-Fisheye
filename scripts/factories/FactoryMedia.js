import Video from '../models/Video.js'
import Image from '../models/Image.js'
class FactoryMedia {
    constructor(media) {
        if (media.image) {
            return new Image(media)
        } 
        else if (media.video) {
            return new Video(media)
        }

    }
}
export default FactoryMedia