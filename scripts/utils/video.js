/**
 * Gère la fonctionnalité de prévisualisation vidéo au survol
 * Implémente la prévisualisation automatique et le nettoyage des éléments vidéo
 * @module videoHover
 */

/**
 * Configure la fonctionnalité de prévisualisation vidéo avec interactions au survol
 * Démarre/arrête automatiquement la prévisualisation avec les événements de souris
 */
export const videoHover = () => {
    const video = document.querySelector('#main .gallery-container .gallery video')
    let previewTimeout = null;

    /**
     * Démarre la prévisualisation vidéo avec des paramètres de lecture spécifiques
     */
    const startPreview = () => {
        video.muted = true;
        video.currentTime = 1;
        video.playbackRate = 0.5;
        video.play();
    }

    /**
     * Arrête la prévisualisation vidéo et réinitialise les paramètres de lecture
     */
    const stopPreview = () => {
        video.currentTime = 0;
        video.playbackRate = 1;
        video.pause();
    }

    // Démarre la prévisualisation au survol de la souris avec un délai de 8 secondes
    video.addEventListener("mouseenter", () => {
        startPreview();
        previewTimeout = setTimeout(stopPreview, 8000);
    })

    // Arrête la prévisualisation et efface le délai quand la souris quitte la zone
    video.addEventListener("mouseleave", () => {
        clearTimeout(previewTimeout);
        previewTimeout = null;
        stopPreview();
    })
}