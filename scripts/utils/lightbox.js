import Gallery from "../templates/Gallery.js"
export const displayLightbox = (medias, photographer) => {
    const thumbs = document.querySelectorAll('article figure')
    const lightbox = document.querySelector('.lightbox-overlay')
    const btnClose = document.querySelector('.lightbox__btn_close')
    const btnPrev = document.querySelector('.lightbox__btn_previous')
    const btnNext = document.querySelector('.lightbox__btn_next')
    const mediaWrapper = document.querySelector('.lightbox__media')
    let currentIndex = 0

    thumbs.forEach(thumb => thumb.addEventListener("click", () => {
        const mediaIndex = medias.findIndex(media => media.id === Number(thumb.dataset.id))
        currentIndex = mediaIndex
        lightbox.style.display = 'flex'
        nextMedia()
        prevMedia()
        closeLightbox()
        displayMedia()
    }))

    const closeLightbox = () => {
        btnClose.addEventListener("click", () => {
            lightbox.style.display = 'none'
        })
    }

    const displayMedia = () => {
        const currentMedia = medias[currentIndex]
        const Template = `${currentMedia.image ? `
            <img src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.image}" alt="${currentMedia.alt}">` :
            `<video controls aria-label="${currentMedia.title}"><source src="./assets/images/${Gallery.getFolderName(photographer.name)}/${currentMedia.video}" type="video/mp4"></video>`}
            <figcaption>${currentMedia.title}</figcaption>`
        mediaWrapper.innerHTML = Template
    }

    const nextMedia = () => {
        currentIndex++
        if (currentIndex > medias.length - 1) currentIndex = 0;
        mediaWrapper.innerHTML = ''
        displayMedia(currentIndex)
    }

    const prevMedia = () => {
        currentIndex--
        if (currentIndex < 0 ) currentIndex = medias.length - 1;
        mediaWrapper.innerHTML = ''
        displayMedia(currentIndex)
    }

    btnNext.addEventListener("click", () => nextMedia())
    btnPrev.addEventListener("click", () => prevMedia())
}
