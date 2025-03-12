
/**
 * Gère les requêtes API pour récupérer des données depuis des endpoints JSON
 * @class
 */
class Api {
    /**
     * Crée une nouvelle instance Api
     * @param {string} url - L'URL de l'endpoint pour récupérer les données
     */
    constructor(url) {
        this._url = url
    }

    /**
     * Récupère et analyse les données JSON depuis l'endpoint API
     * @async
     * @returns {Promise<Object>} La réponse JSON analysée
     * @throws {Error} Si la réponse HTTP n'est pas OK ou si le format des données est invalide
     */
    async get() {
        try {
            const response = await fetch(this._url)
            if (!response.ok) throw new Error(`Error http : ${response.status}`)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Format de données inconnu', { error: error })
        }
    }
}

export default Api
