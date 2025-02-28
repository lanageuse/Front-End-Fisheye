/**
 * Manages modal dialog functionality with accessibility support
 * @module modal
 */

const openCloseModal = () => {
    const $modal = document.getElementById("contact_modal");
    const $modalTitle = document.getElementById("modalTitle");
    const $mainWrapper = document.getElementById("main");
    const $openModalBtn = document.querySelector('.contact_button')
    const $closeModalBtn = document.querySelector('.close_modal')
    const $submitBtn = document.querySelector('button[type="submit"]')

    /**
     * Opens modal and sets appropriate ARIA attributes
     */
    const openModal = () => {
        $modal.style.display = 'block';
        $modal.setAttribute("aria-hidden", "false");
        $mainWrapper.setAttribute("aria-hidden", "true");
        $modalTitle.focus()
    };

    /**
     * Closes modal and restores main content accessibility
     */
    const closeModal = () => {
        $modal.style.display = 'none';
        $modal.setAttribute("aria-hidden", "true");
        $mainWrapper.setAttribute("aria-hidden", "false");
        $openModalBtn.focus()
    };

    // Modal open button handler
    $openModalBtn.addEventListener("click", () => {
        openModal();
    })

    // Modal close button handler
    $closeModalBtn.addEventListener("click", () => {
        closeModal()
    })

    // Global keyboard navigation handler
    window.addEventListener("keydown", e => {
        if ($modal.getAttribute('aria-hidden') === 'false') {
            switch (e.key) {
                case 'Escape' :
                    closeModal()
                    break;
                case 'Tab' : 
                if (document.activeElement === $submitBtn) {
                    $modalTitle.focus();
                }
                    break;
            }
        }
    })
};

export default openCloseModal;