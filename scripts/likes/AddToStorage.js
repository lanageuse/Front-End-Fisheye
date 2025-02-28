/**
 * Manages likes data updates in localStorage
 * @class
 */
class AddToStorage {
    /**
     * Updates the like status and count for a specific media item
     * @param {string} action - The action to perform ('ADD' or 'REMOVE')
     * @param {Object} data - The data object containing media and photographer information
     * @param {string|number} data.photograph_id - ID of the photographer
     * @param {string|number} data.media_id - ID of the media item
     * @throws {Error} If media doesn't exist in localStorage
     */
    update(action, data) {
        const storage = JSON.parse(localStorage.getItem(`${data.photograph_id}`))
        if (!(storage)) {
            throw new Error(`media ${data.media_id} doesn't exist in localstorage`)
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