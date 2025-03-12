/**
 * Gère le compteur total de likes dans le widget
 * @class
 */
class Counter {
    /**
     * Crée une nouvelle instance de Counter commençant à 0
     */
    constructor() {
        this._count = 0
    }
    
    /**
     * Met à jour le nombre total de likes dans le widget
     * @param {string} action - L'action à effectuer ('INC' ou 'DEC')
     * @throws {Error} Si l'action n'est pas reconnue
     */
    update(action) {
        const wrapper = document.querySelector('.widget .total-likes')
        const count = Number(wrapper.innerHTML) || 'Undefined'
        this._count = count

        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Action inconnue"
        }

        wrapper.innerHTML = this._count
    }
}

export default Counter