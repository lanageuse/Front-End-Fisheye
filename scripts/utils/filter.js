import { handleLikes } from "./likes.js";
import { displayLightbox } from "./lightbox.js";
export const handleFilter = (gallery, updateDisplay) => {
    const dropDown = document.querySelector('.dropbtn')
    const dropDownSpan = document.querySelector('.dropbtn span')
    const dropDownIcon = document.querySelector('.dropbtn i')
    const dropDownContent = document.getElementById('dropdownMenu')
    const dropDownButtons = dropDownContent.querySelectorAll('button')

    dropDown.addEventListener("click", () => {
        dropDownContent.classList.toggle('show')
        dropDownIcon.classList.toggle('open')
    })

    dropDownButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filterType = button.textContent.trim().toLowerCase();
            const currentFilter = dropDown.textContent
            const selectedFilter = button.textContent

            dropDownContent.classList.toggle('show')
            dropDownIcon.classList.toggle('open')
            
            dropDownSpan.innerHTML = selectedFilter
            button.textContent = currentFilter

            let sortedGallery = [...gallery]

            switch (filterType) {
                case "popularité":
                    sortedGallery.sort((a, b) => b.likes - a.likes);
                    break;
                case "date":
                    sortedGallery.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case "titre":
                    sortedGallery.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    break;
            }

            updateDisplay(sortedGallery);
            handleLikes()
        });
    });
};