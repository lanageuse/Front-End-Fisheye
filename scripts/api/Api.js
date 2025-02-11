class Api{
    constructor(url, property){
        this._url = url
        this._property = property
    }

    async get(){
        try {
            const response = await fetch(this._url)
            if(!(response.ok)) throw new Error(`Error http : ${response.status}`)
            const data = await response.json()
            return data[this._property]
        } catch (error) {
            throw new Error('Format de données inconnu', {error : error})
        }
    }
}

export default Api
