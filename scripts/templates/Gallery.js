/**
 * Component for rendering a media gallery and associated widgets
 * @class
 */
class Gallery {
    /**
     * Creates a new Gallery instance
     * @param {Array} medias - Array of media items to display
     * @param {Object} photographer - Photographer data object
     */
    constructor(medias, photographer) {
        this.photographer = photographer
        this.medias = medias
    }

    /**
     * Formats photographer name for use in file paths
     * @static
     * @param {string} name - Photographer's full name
     * @returns {string} Formatted name for folder structure
     */
    static getFolderName(name) {
        return name
            .replace(/[-_]/g, ' ')
            .trim()
            .split(' ')
            .slice(0, -1)
            .join(' ')
    }

    /**
     * Generates HTML for the media gallery
     * @returns {string} HTML string for the gallery section
     */
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
                    <div class="likes handleLikes ${media.isLiked ? 'liked' : ''}" role="button" data-id="${media.id}"  tabindex="0">
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

    /**
     * Calculates total likes across all media items
     * @returns {number} Total number of likes
     */
    getCountLikes() {
        const result = this.medias.reduce((acc, media) => acc + media.likes, 0)
        return result
    }

    /**
     * Generates HTML for the likes and price widget
     * @returns {string} HTML string for the widget
     */
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