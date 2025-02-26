import Gallery from "../templates/Gallery.js"

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

    // Fonction pour ouvrir la lightbox
    const openLightBox = (thumb) => {
        currentIndex = medias.findIndex(media => media.id === Number(thumb.dataset.id));
        lightboxOverlay.style.display = 'flex';
        lightbox.setAttribute("aria-hidden", "false");
        mainContent.setAttribute("aria-hidden", "true"); // Cache le reste du contenu
        displayMedia();
        lightbox.focus();
    };

    // Fonction pour fermer la lightbox
    const closeLightbox = () => {
        lightboxOverlay.style.display = 'none';
        lightbox.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("aria-hidden", "false"); // Rétablit l'accès au contenu principal
        thumbs[currentIndex].focus(); // Remet le focus sur la miniature correspondante
    };

    // Affichage des médias dans la lightbox
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

    // Fonction pour passer au média suivant
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        displayMedia();
    };

    // Fonction pour revenir au média précédent
    const prevMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        displayMedia();
    };

    // Événements sur les boutons de navigation
    btnNext.addEventListener("click", nextMedia);
    btnPrev.addEventListener("click", prevMedia);
    btnClose.addEventListener("click", closeLightbox);

    // Ouvrir la lightbox au clic
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => openLightBox(thumb));
        thumb.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openLightBox(thumb);
        });
    });

    // Navigation au clavier
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
                case 'Tab': // Empêche de sortir de la lightbox avec Tab
                    if (document.activeElement === btnClose) {
                        lightbox.focus();
                    }
                    break;
            }
        }
    });
};
