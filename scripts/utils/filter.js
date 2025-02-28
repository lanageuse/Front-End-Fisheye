/**
 * Manages dropdown filtering functionality with accessibility support
 * @module filter
 */

import { handleLikes } from "./likes.js";
import { displayLightbox } from "./lightbox.js";

/**
 * Sets up and manages dropdown filtering functionality
 * @param {Array} gallery - Array of media items to filter
 * @param {Function} updateDisplay - Callback function to update the display
 * @param {Object} photographer - Photographer data object
 */
export const handleFilter = (gallery, updateDisplay, photographer) => {
    const dropDown = document.querySelector('.dropbtn');
    const dropDownSpan = document.querySelector('.dropbtn span');
    const dropDownIcon = document.querySelector('.dropbtn i');
    const dropDownContent = document.getElementById('dropdownMenu');
    const dropDownButtons = dropDownContent.querySelectorAll('button');

    /**
     * Toggles dropdown menu visibility and accessibility attributes
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

    // Handle dropdown button click
    dropDown.addEventListener("click", toggleDropdown);

    // Handle keyboard navigation for dropdown button
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

    // Handle dropdown options events
    dropDownButtons.forEach((button, index) => {
        // Handle option selection
        button.addEventListener('click', () => {
            const filterType = button.textContent.trim().toLowerCase();
            const currentFilter = dropDownSpan.textContent;
            const selectedFilter = button.textContent;

            // Update dropdown display
            dropDownSpan.innerHTML = selectedFilter;
            button.textContent = currentFilter;

            // Close dropdown
            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
            dropDown.focus();

            // Sort gallery based on selected filter
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

            // Update display with sorted gallery
            updateDisplay(sortedGallery);
            handleLikes();
            displayLightbox(sortedGallery, photographer);
        });

        // Handle keyboard navigation within dropdown options
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

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!dropDown.contains(event.target) && !dropDownContent.contains(event.target)) {
            dropDownContent.classList.remove('show');
            dropDownIcon.classList.remove('open');
            dropDown.setAttribute("aria-expanded", "false");
            dropDownContent.setAttribute("aria-hidden", "true");
        }
    });
};