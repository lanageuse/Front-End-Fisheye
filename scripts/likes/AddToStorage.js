class AddToStorage {

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