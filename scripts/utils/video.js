/**
 * Manages video preview functionality on hover
 * Implements auto-preview and cleanup for video elements
 * @module videoHover
 */

/**
 * Sets up video preview functionality with hover interactions
 * Automatically starts/stops preview with mouse events
 */
export const videoHover = () => {
    const video = document.querySelector('#main .gallery-container .gallery video')
    let previewTimeout = null;

    /**
     * Starts video preview with specific playback settings
     */
    const startPreview = () => {
        video.muted = true;
        video.currentTime = 1;
        video.playbackRate = 0.5;
        video.play();
    }

    /**
     * Stops video preview and resets playback settings
     */
    const stopPreview = () => {
        video.currentTime = 0;
        video.playbackRate = 1;
        video.pause();
    }

    // Start preview on mouse enter with 8-second timeout
    video.addEventListener("mouseenter", () => {
        startPreview();
        previewTimeout = setTimeout(stopPreview, 8000);
    })

    // Stop preview and clear timeout on mouse leave
    video.addEventListener("mouseleave", () => {
        clearTimeout(previewTimeout);
        previewTimeout = null;
        stopPreview();
    })
}