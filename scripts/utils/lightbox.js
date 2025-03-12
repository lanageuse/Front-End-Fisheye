/**
 * Implémente un composant de galerie lightbox accessible
 * @module lightbox
 */

import Gallery from "../templates/Gallery.js"

/**
 * Configure et gère la fonctionnalité lightbox avec navigation au clavier et accessibilité
 * @param {Array} medias - Tableau des éléments média à afficher dans la lightbox
 * @param {Object} photographer - Objet contenant les données du photographe pour la construction des chemins de fichiers
 */
export const displayLightbox = (medias, photographer) => {
    const thumbs = document.querySelectorAll('article figure');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightbox = document.querySelector('.lightbox');
    const btnClose = document.querySelector('.lightbox__btn_close');
    const btnPrev = document.querySelector('.lightbox__btn_previous');
    const btnNext = document.querySelector('.lightbox__btn_next');
    const mediaWrapper = document.querySelector('.lightbox__media');
    const mainContent = document.getElementById("main");
    let currentIndex = 0;

    /**
     * Ouvre la lightbox et affiche le média sélectionné
     * @param {HTMLElement} thumb - Élément vignette qui a déclenché la lightbox
     */
    const openLightBox = (thumb) => {
        currentIndex = medias.findIndex(media => media.id === Number(thumb.dataset.id));
        lightboxOverlay.style.display = 'flex';
        lightbox.setAttribute("aria-hidden", "false");
        mainContent.setAttribute("aria-hidden", "true");
        displayMedia();
        lightbox.focus();
    };

    /**
     * Ferme la lightbox et restaure la visibilité du contenu principal
     */
    const closeLightbox = () => {
        lightboxOverlay.style.display = 'none';
        lightbox.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("aria-hidden", "false");
        thumbs[currentIndex].focus();
    };

    /**
     * Affiche l'élément média actuel dans la lightbox
     */
    const displayMedia = () => {
        const currentMedia = medias[currentIndex];
        const template = currentMedia.image ? `
            <img src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.image}" alt="${currentMedia.title}">
        ` : `
            <video controls aria-label="${currentMedia.title}">
                <source src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.video}" type="video/mp4">
            </video>
        `;
        mediaWrapper.innerHTML = template + `<figcaption tabindex="0">${currentMedia.title}</figcaption>`;
    };

    /**
     * Affiche l'élément média suivant dans la galerie
     */
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        displayMedia();
    };

    /**
     * Affiche l'élément média précédent dans la galerie
     */
    const prevMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        displayMedia();
    };

    // Écouteurs d'événements pour les boutons de navigation
    btnNext.addEventListener("click", nextMedia);
    btnPrev.addEventListener("click", prevMedia);
    btnClose.addEventListener("click", closeLightbox);

    // Écouteurs d'événements pour les clics et touches sur les vignettes
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => openLightBox(thumb));
        thumb.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openLightBox(thumb);
        });
    });

    // Navigation globale au clavier
    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.style.display === 'flex') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevMedia();
                    break;
                case 'ArrowRight':
                    nextMedia();
                    break;
                case 'Tab':
                    if (document.activeElement === btnClose) {
                        lightbox.focus();
                    }
                    break;
            }
        }
    });
};