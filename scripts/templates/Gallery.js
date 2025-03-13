/**
 * Composant pour l'affichage d'une galerie média et ses widgets associés
 * @class
 */
class Gallery {
    /**
     * Crée une nouvelle instance de Gallery
     * @param {Array} medias - Tableau des éléments média à afficher
     * @param {Object} photographer - Objet contenant les données du photographe
     */
    constructor(medias, photographer) {
        this.photographer = photographer
        this.medias = medias
    }

    /**
     * Formate le nom du photographe pour l'utilisation dans les chemins de fichiers
     * @static
     * @param {string} name - Nom complet du photographe
     * @returns {string} Nom formaté pour la structure des dossiers
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
     * Génère le HTML pour la galerie média
     * @returns {string} Chaîne HTML pour la section galerie
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
                ` <figure class="thumb__video" data-id="${media.id}" tabindex="0" role="link" aria-label="Ouvrir l'image ${media.title}">
                    <video>
                    <source src="./assets/images/${Gallery.getFolderName(this.photographer.name)}/${media.video}" type="video/mp4" />
                    </video>
                </figure>`
            return `
           <article class="thumb">
                ${renderMedia}
                <div class="thumb__details">
                    <h2  tabindex="0">${media.title}</h2>
                    <div class="likes handleLikes ${media.isLiked ? 'liked' : ''}" role="button" aria-label="Cliquer sur entrée pour supprimer votre like" data-id="${media.id}"  tabindex="0">
                    <span class="count" aria-label="${media.likes} likes">${media.likes}</span><i class="fi-hearth" aria-hidden="true"></i>
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
     * Calcule le nombre total de likes pour tous les médias
     * @returns {number} Nombre total de likes
     */
    getCountLikes() {
        const result = this.medias.reduce((acc, media) => acc + media.likes, 0)
        return result
    }

    /**
     * Génère le HTML pour le widget de likes et de prix
     * @returns {string} Chaîne HTML pour le widget
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