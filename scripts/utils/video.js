
export const videoHover = () => {
    const video = document.querySelector('#main .gallery-container .gallery video')
    let previewTimeout = null;

    const startPreview = () => {
        video.muted = true;
        video.currentTime = 1;
        video.playbackRate = 0.5;
        video.play();
    }

    const stopPreview = () => {
        video.currentTime = 0;
        video.playbackRate = 1;
        video.pause();
    }

    video.addEventListener("mouseenter", () => {
        startPreview();
        previewTimeout = setTimeout(stopPreview, 8000);
    })

    video.addEventListener("mouseleave", () => {
        clearTimeout(previewTimeout);
        previewTimeout = null;
        stopPreview();
    })
}