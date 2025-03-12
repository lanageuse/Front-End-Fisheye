/**
 * Gère la fonctionnalité de la fenêtre modale avec support d'accessibilité
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
     * Ouvre la modale et définit les attributs ARIA appropriés
     */
    const openModal = () => {
        $modal.style.display = 'block';
        $modal.setAttribute("aria-hidden", "false");
        $mainWrapper.setAttribute("aria-hidden", "true");
        $modalTitle.focus()
    };

    /**
     * Ferme la modale et restaure l'accessibilité du contenu principal
     */
    const closeModal = () => {
        $modal.style.display = 'none';
        $modal.setAttribute("aria-hidden", "true");
        $mainWrapper.setAttribute("aria-hidden", "false");
        $openModalBtn.focus()
    };

    // Gestionnaire du bouton d'ouverture de la modale
    $openModalBtn.addEventListener("click", () => {
        openModal();
    })

    // Gestionnaire du bouton de fermeture de la modale
    $closeModalBtn.addEventListener("click", () => {
        closeModal()
    })

    // Gestionnaire de navigation globale au clavier
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