/**
 * Gère les mises à jour des données de likes dans le localStorage
 * @class
 */
class AddToStorage {
    /**
     * Met à jour le statut et le nombre de likes pour un média spécifique
     * @param {string} action - L'action à effectuer ('ADD' ou 'REMOVE')
     * @param {Object} data - L'objet contenant les informations du média et du photographe
     * @param {string|number} data.photograph_id - ID du photographe
     * @param {string|number} data.media_id - ID du média
     * @throws {Error} Si le média n'existe pas dans le localStorage
     */
    update(action, data) {
        const storage = JSON.parse(localStorage.getItem(`${data.photograph_id}`))
        if (!(storage)) {
            throw new Error(`Le média ${data.media_id} n'existe pas dans le localStorage`)
        }

        let updateStorage = storage.map((element) => {
            if (element.id === Number(data.media_id)) {
                element.isLiked = action === 'ADD' ? true : false
                element.likes = action === 'ADD' ? element.likes + 1 : element.likes - 1
            }
            return element
        });
        localStorage.setItem(`${data.photograph_id}`, JSON.stringify(updateStorage))
    }
}

export default AddToStorage