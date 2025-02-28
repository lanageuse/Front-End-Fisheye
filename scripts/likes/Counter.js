/**
 * Manages the total likes counter in the widget
 * @class
 */
class Counter {
    /**
     * Creates a new Counter instance starting at 0
     */
    constructor() {
        this._count = 0
    }
    
    /**
     * Updates the total likes count in the widget
     * @param {string} action - The action to perform ('INC' or 'DEC')
     * @throws {Error} If action is not recognized
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
            throw "Unknown action"
        }

        wrapper.innerHTML = this._count
    }
}

export default Counter