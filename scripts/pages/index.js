import Api from '../api/Api.js' 
import Photograph from '../models/Photograph.js'
import CardProfile from '../templates/CardProfile.js'

/**
 * Gère l'initialisation de la page principale et la gestion des données des photographes
 * @class
 */
class Index {
    /**
     * Crée une nouvelle instance Index
     * Initialise le tableau des photographes, la connexion API et les éléments du DOM
     */
    constructor() {
        this.photographers = []
        this.dataApi = new Api('./data/photographers.json')
        this.$wrapper = document.getElementById('main')
        this.$dataWrapper = document.querySelector('.photographer_section')
        this.dataLocal = localStorage.getItem("photographers") || null
    }

    /**
     * Récupère les données des photographes depuis le stockage local ou l'API
     * @async
     * @returns {Array<Photograph>} Tableau d'instances de photographes
     */
    async fetchData() {
        if (this.dataLocal) {
            const photographers = JSON.parse(this.dataLocal)
            this.photographers = photographers.map(photograph => new Photograph(photograph))
        } else {
            const { photographers } = await this.dataApi.get()
            this.photographers = photographers.map(photograph => new Photograph(photograph))
            this.saveData(this.photographers, "photographers")
        }
        return this.photographers
    }

    /**
     * Sauvegarde les données dans le localStorage
     * @param {Array<Object>} data - Données à sauvegarder
     * @param {string} item - Clé du localStorage
     */
    saveData(data, item) {
        localStorage.setItem(item, JSON.stringify(data))
    }

    /**
     * Affiche les profils des photographes sur la page
     * @async
     */
    async displayProfiles() {
        this.photographers.map(data => {
            const Template = new CardProfile(data)
            this.$dataWrapper.appendChild(Template.createCard())
        })
    }

    /**
     * Initialise l'application
     * @async
     */
    async main() {
        this.fetchData()
        await this.displayProfiles()
    }
}

// Initialise l'application
const app = new Index()
app.main()

export default Index