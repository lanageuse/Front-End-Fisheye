/**
 * Implements an accessible lightbox gallery component
 * @module lightbox
 */

import Gallery from "../templates/Gallery.js"

/**
 * Sets up and manages lightbox functionality with keyboard navigation and accessibility
 * @param {Array} medias - Array of media items to display in lightbox
 * @param {Object} photographer - Photographer data object for file path construction
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
     * Opens lightbox and displays selected media
     * @param {HTMLElement} thumb - Thumbnail element that triggered the lightbox
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
     * Closes lightbox and restores main content visibility
     */
    const closeLightbox = () => {
        lightboxOverlay.style.display = 'none';
        lightbox.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("aria-hidden", "false");
        thumbs[currentIndex].focus();
    };

    /**
     * Renders current media item in lightbox
     */
    const displayMedia = () => {
        const currentMedia = medias[currentIndex];
        const template = currentMedia.image ? `
            <img src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.image}" alt="${currentMedia.alt}">
        ` : `
            <video controls aria-label="${currentMedia.title}">
                <source src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.video}" type="video/mp4">
            </video>
        `;
        mediaWrapper.innerHTML = template + `<figcaption tabindex="0">${currentMedia.title}</figcaption>`;
    };

    /**
     * Displays next media item in gallery
     */
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        displayMedia();
    };

    /**
     * Displays previous media item in gallery
     */
    const prevMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        displayMedia();
    };

    // Navigation button event listeners
    btnNext.addEventListener("click", nextMedia);
    btnPrev.addEventListener("click", prevMedia);
    btnClose.addEventListener("click", closeLightbox);

    // Thumbnail click and keyboard event listeners
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => openLightBox(thumb));
        thumb.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openLightBox(thumb);
        });
    });

    // Global keyboard navigation
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