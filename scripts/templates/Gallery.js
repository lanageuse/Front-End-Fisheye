class Gallery {
    constructor(medias, photographer) {
        this.photographer = photographer
        this.medias = medias
    }

    static getFolderName(name) {
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
                ` <figure class="thumb__img" data-id="${media.id}" tabindex="0" role="link" aria-label="ouvrir l'image ${media.title}">
              <img src="./assets/images/${Gallery.getFolderName(this.photographer.name)}/thumbs/${media.image}" alt="${media.title}">
            </figure>`
                :
                ` <figure class="thumb__video" data-id="${media.id}" tabindex="0" role="link" aria-label="Ouvrir l'image">
                    <video>
                    <source src="./assets/images/${Gallery.getFolderName(this.photographer.name)}/${media.video}" type="video/mp4" />
                    </video>
                </figure>`
            return `
           <article class="thumb">
                ${renderMedia}
                <div class="thumb__details">
                    <h2  tabindex="0">${media.title}</h2>
                    <div class="likes handleLikes" role="button" data-id="${media.id}"  tabindex="0">
                    <span class="count">${media.likes}</span><i class="fi-hearth" aria-hidden="true"></i>
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
            <div class="widget__likes likes" aria-label="Nombre total de likes : ${this.getCountLikes()}" tabindex="0">
                <span class="total-likes">${this.getCountLikes()}</span>
                <i class="fi-hearth" aria-hidden="true"></i>
            </div>
            <div class="widget__daily_rate" id="daily-rate" aria-label="Tarif journalier du photographe : ${this.photographer.price} euros" tabindex="0">
            <span class="price">${this.photographer.price}</span> € / jour
            </div>
        `
        return widget
    }

}
export default Gallery


