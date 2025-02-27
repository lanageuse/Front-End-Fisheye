import { handleLikes } from "./likes.js";
import { displayLightbox } from "./lightbox.js";

export const handleFilter = (gallery, updateDisplay, photographer) => {
    const dropDown = document.querySelector('.dropbtn');
    const dropDownSpan = document.querySelector('.dropbtn span');
    const dropDownIcon = document.querySelector('.dropbtn i');
    const dropDownContent = document.getElementById('dropdownMenu');
    const dropDownButtons = dropDownContent.querySelectorAll('button');

    // Fonction pour ouvrir/fermer le menu déroulant
    const toggleDropdown = () => {
        const isOpen = dropDownContent.classList.contains('show');
        dropDownContent.classList.toggle('show');
        dropDownIcon.classList.toggle('open');
        dropDown.setAttribute("aria-expanded", !isOpen);
        dropDownContent.setAttribute("aria-hidden", isOpen);

        // Gérer le focus des éléments du menu
        dropDownButtons.forEach(button => {
            button.setAttribute("tabindex", isOpen ? "-1" : "0");
        });

        if (!isOpen) {
            dropDownButtons[0].focus(); // Focus sur le premier élément
        }
    };

    // Gestion du clic sur le bouton principal
    dropDown.addEventListener("click", toggleDropdown);

    // Gestion de la navigation clavier
    dropDown.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                toggleDropdown();
                break;
            case "ArrowDown":
                e.preventDefault();
                dropDownButtons[0].focus();
                break;
        }
    });

    dropDownButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.textContent.trim();
            dropDownSpan.textContent = selectedFilter; // Mettre à jour le texte du bouton

            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
            dropDown.focus(); // Remet le focus sur le bouton après sélection

            // Appliquer le tri
            let sortedGallery = [...gallery];
            switch (selectedFilter.toLowerCase()) {
                case "popularité":
                    sortedGallery.sort((a, b) => b.likes - a.likes);
                    break;
                case "date":
                    sortedGallery.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case "titre":
                    sortedGallery.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }

            updateDisplay(sortedGallery);
            handleLikes();
            displayLightbox(sortedGallery, photographer);
        });

        // Navigation au clavier dans la liste des options
        button.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowDown": {
                    e.preventDefault();
                    const next = dropDownButtons[index + 1] || dropDownButtons[0];
                    next.focus();
                    break;
                }
                case "ArrowUp": {
                    e.preventDefault();
                    const prev = dropDownButtons[index - 1] || dropDownButtons[dropDownButtons.length - 1];
                    prev.focus();
                    break;
                }
                case "Escape":
                    e.preventDefault();
                    dropDownContent.classList.remove('show');
                    dropDownIcon.classList.remove('open');
                    dropDown.setAttribute("aria-expanded", "false");
                    dropDownContent.setAttribute("aria-hidden", "true");
                    dropDown.focus();
                    break;
            }
        });
    });

    // Fermer le menu si l'utilisateur clique en dehors
    document.addEventListener("click", (event) => {
        if (!dropDown.contains(event.target) && !dropDownContent.contains(event.target)) {
            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
        }
    });
};
