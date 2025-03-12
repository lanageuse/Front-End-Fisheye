/**
 * Gère la fonctionnalité de filtrage par menu déroulant avec support d'accessibilité
 * @module filter
 */

import { handleLikes } from "./likes.js";
import { displayLightbox } from "./lightbox.js";

/**
 * Configure et gère la fonctionnalité de filtrage par menu déroulant
 * @param {Array} gallery - Tableau des éléments média à filtrer
 * @param {Function} updateDisplay - Fonction de rappel pour mettre à jour l'affichage
 * @param {Object} photographer - Objet contenant les données du photographe
 */
export const handleFilter = (gallery, updateDisplay, photographer) => {
    const dropDown = document.querySelector('.dropbtn');
    const dropDownSpan = document.querySelector('.dropbtn span');
    const dropDownIcon = document.querySelector('.dropbtn i');
    const dropDownContent = document.getElementById('dropdownMenu');
    const dropDownButtons = dropDownContent.querySelectorAll('button');

    /**
     * Bascule la visibilité du menu déroulant et les attributs d'accessibilité
     */
    const toggleDropdown = () => {
        const isOpen = dropDownContent.classList.contains('show');
        dropDownContent.classList.toggle('show');
        dropDownIcon.classList.toggle('open');
        dropDown.setAttribute("aria-expanded", !isOpen);
        dropDownContent.setAttribute("aria-hidden", isOpen);

        dropDownButtons.forEach(button => {
            button.setAttribute("tabindex", isOpen ? "-1" : "0");
        });

        if (!isOpen) {
            dropDownButtons[0].focus();
        }
    };

    // Gestion du clic sur le bouton du menu déroulant
    dropDown.addEventListener("click", toggleDropdown);

    // Gestion de la navigation au clavier pour le bouton du menu déroulant
    dropDown.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "Enter":
                e.preventDefault();
                toggleDropdown();
                break;
            case "ArrowDown":
                e.preventDefault();
                dropDownButtons[0].focus();
                break;
        }
    });

    // Gestion des événements des options du menu déroulant
    dropDownButtons.forEach((button, index) => {
        // Gestion de la sélection d'une option
        button.addEventListener('click', () => {
            const filterType = button.textContent.trim().toLowerCase();
            const currentFilter = dropDownSpan.textContent;
            const selectedFilter = button.textContent;

            // Mise à jour de l'affichage du menu déroulant
            dropDownSpan.innerHTML = selectedFilter;
            button.textContent = currentFilter;

            // Fermeture du menu déroulant
            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
            dropDown.focus();

            // Tri de la galerie selon le filtre sélectionné
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
            }

            // Mise à jour de l'affichage avec la galerie triée
            updateDisplay(sortedGallery);
            handleLikes();
            displayLightbox(sortedGallery, photographer);
        });

        // Gestion de la navigation au clavier dans les options du menu déroulant
        button.addEventListener("keydown", (e) => {
            const next = dropDownButtons[index + 1] || dropDownButtons[0];
            const prev = dropDownButtons[index - 1] || dropDownButtons[dropDownButtons.length - 1];
            
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    next.focus();
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    prev.focus();
                    break;
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

    // Fermeture du menu déroulant lors d'un clic à l'extérieur
    document.addEventListener("click", (event) => {
        if (!dropDown.contains(event.target) && !dropDownContent.contains(event.target)) {
            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
        }
    });
};