class Api{
    constructor(url){
        this._url = url
    }
    async get(){
        try {
            const response = await fetch(this._url)
            if(!(response.ok)) throw new Error(`Error http : ${response.status}`)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Format de données inconnu', {error : error})
        }
    }
}

export default Api
