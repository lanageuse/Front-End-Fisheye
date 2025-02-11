import Api from '../api/Api.js' 
import Photograph from '../models/photograph.js'
import CardProfile from '../templates/CardProfile.js'

class Index{
    constructor(){
        this.photographers = []
        this.dataApi = new Api('./data/photographers.json', 'photographers')
        this.$wrapper = document.getElementById('main')
        this.$dataWrapper = document.querySelector('.photographer_section')
    }

    async fetchData(){
        const photographers  = await this.dataApi.get()
        this.photographers = photographers.map(photograph => new Photograph(photograph))
        return this.photographers
    }

    async displayProfiles(){
        this.photographers.map(data =>{
            const Template = new CardProfile(data)
            this.$dataWrapper.appendChild(Template.createCard())
        })
    }
    async main(){
        await this.fetchData()
        await this.displayProfiles()   
    }
}

const app = new Index()
app.main()