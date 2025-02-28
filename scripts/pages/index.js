import Api from '../api/Api.js' 
import Photograph from '../models/Photograph.js'
import CardProfile from '../templates/CardProfile.js'

/**
 * Handles the main page initialization and photographer data management
 * @class
 */
class Index {
    /**
     * Creates a new Index instance
     * Initializes the photographers array, API connection, and DOM elements
     */
    constructor() {
        this.photographers = []
        this.dataApi = new Api('./data/photographers.json')
        this.$wrapper = document.getElementById('main')
        this.$dataWrapper = document.querySelector('.photographer_section')
        this.dataLocal = localStorage.getItem("photographers") || null
    }

    /**
     * Fetches photographer data from local storage or API
     * @async
     * @returns {Array<Photograph>} Array of photographer instances
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
     * Saves data to localStorage
     * @param {Array<Object>} data - Data to be saved
     * @param {string} item - localStorage key
     */
    saveData(data, item) {
        localStorage.setItem(item, JSON.stringify(data))
    }

    /**
     * Displays photographer profiles on the page
     * @async
     */
    async displayProfiles() {
        this.photographers.map(data => {
            const Template = new CardProfile(data)
            this.$dataWrapper.appendChild(Template.createCard())
        })
    }

    /**
     * Initializes the application
     * @async
     */
    async main() {
        this.fetchData()
        await this.displayProfiles()
    }
}

// Initialize the application
const app = new Index()
app.main()

export default Index