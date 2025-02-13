class Counter{
    constructor() {
        this._count = 0
    }
    
    update(action) {
        const wrapper = document.querySelector('.widget .total-likes')
        const count = Number(wrapper.getHTML()) || 'Undefined'
        this._count = count
        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Unknow action"
        }

       wrapper.innerHTML = this._count
    }
}

export default Counter