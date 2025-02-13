const openCloseModal = () => {
    const modal = document.getElementById("contact_modal");

    const openModal = () => {
        document.querySelector('.contact_button')
            .addEventListener("click", () => {
                modal.style.display = 'block';
                modal.setAttribute("aria-hidden", "false");
            });
    };

    const closeModal = () => {
        document.querySelector('.close_modal')
            .addEventListener("click", () => {
                modal.style.display = 'none';
                modal.setAttribute("aria-hidden", "true"); 
            });
    };

    openModal();
    closeModal();
};

export default openCloseModal;
