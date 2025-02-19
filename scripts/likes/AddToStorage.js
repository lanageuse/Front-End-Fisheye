class AddToStorage {

    update(action, data) {
        const storage = JSON.parse(localStorage.getItem(`${data[1]}`))
        if (!(storage)) {
            throw new Error(`media ${data[1]} doesn't exist in localstorage`)
        }

        let updateStorage = storage.map((element) => {
            if (element.id === Number(data[0])) {
             element.likes = action === 'ADD' ? element.likes + 1 : element.likes - 1
            }
            return element
         });
         localStorage.setItem(`${data[1]}`, JSON.stringify(updateStorage))
    }

}
export default AddToStorage