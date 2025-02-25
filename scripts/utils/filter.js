import { handleLikes } from "./likes.js";
import { displayLightbox } from "./lightbox.js";

export const handleFilter = (gallery, updateDisplay, photographer) => {
    const dropDown = document.querySelector('.dropbtn');
    const dropDownSpan = document.querySelector('.dropbtn span');
    const dropDownIcon = document.querySelector('.dropbtn i');
    const dropDownContent = document.getElementById('dropdownMenu');
    const dropDownButtons = dropDownContent.querySelectorAll('button');

    // Fonction pour ouvrir/fermer le menu
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
    dropDown.addEventListener("click", () => {
        toggleDropdown();
    });

    // Gestion de la navigation au clavier
    dropDown.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            toggleDropdown();
        }
    });

    dropDownButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const filterType = button.textContent.trim().toLowerCase();
            const currentFilter = dropDownSpan.textContent;
            const selectedFilter = button.textContent;

            dropDownSpan.innerHTML = selectedFilter;
            button.textContent = currentFilter;

            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");

            // Réinitialisation du focus sur le bouton principal après sélection
            dropDown.focus();

            // Appliquer le tri
            let sortedGallery = [...gallery];
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
            handleLikes();
            displayLightbox(sortedGallery, photographer);
        });

        // Gestion de la navigation clavier à l'intérieur du menu
        button.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = dropDownButtons[index + 1] || dropDownButtons[0];
                next.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prev = dropDownButtons[index - 1] || dropDownButtons[dropDownButtons.length - 1];
                prev.focus();
            } else if (e.key === "Escape") {
                dropDownContent.classList.remove('show');
                dropDownIcon.classList.remove('open');
                dropDown.setAttribute("aria-expanded", "false");
                dropDownContent.setAttribute("aria-hidden", "true");
                dropDown.focus();
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
