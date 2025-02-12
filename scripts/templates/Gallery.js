import FactoryMedia from "../factories/FactoryMedia.js"
class Gallery {
    constructor(medias, photographer) {
        this.photographer = photographer
        this.medias = medias
    }

    getFolderName() {
        const name = this.photographer.name
        return name
            .replace(/[-_]/g, ' ')
            .trim()
            .split(' ')
            .slice(0, -1)
            .join(' ')
    }

    createGallery() {
        const render = `
        <section class="gallery">
        ${this.medias.map(media => {
            const renderMedia = media.image ?
                ` <figure class="thumb__img">
              <img src="./assets/images/${this.getFolderName()}/${media.image}" alt="">
            </figure>`
                :
                ` <figure class="thumb__video">
                    <video controls width="350">
                    <source src="./assets/images/${this.getFolderName()}/${media.video}" type="video/mp4" />
                    </video>
                </figure>`
            return `
           <article class="thumb">
                ${renderMedia}
                <div class="thumb__details">
                    <h3>${media.title}</h3>
                    <div class="likes">
                    <span>${media.likes}</span><i class="fi-hearth"></i>
                    </div>
                </div>
            </article>
          `
        }).join("")
            }
        </section>
        `
        return render
    }

    getCountLikes() {
        const result = this.medias.reduce((acc, media) => acc + media.likes, 0)
        return result
    }

    createWidget() {
        const widget = `
            <div class="widget__likes likes">
            <span>${this.getCountLikes()}</span><i class="fi-hearth"></i>
            </div>
            <div class="widget__daily_rate" id="daily-rate">
            <span class="price">${this.photographer.price}</span> € / jour
            </div>
        `
        return widget
    }

}
export default Gallery


