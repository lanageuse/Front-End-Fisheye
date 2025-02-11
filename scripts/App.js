import Api from './api/Api.js' 
import Photograph from './models/photograph.js'
import CardProfile from './views/CardProfile.js'

class App{
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

    async displayProfil(){
        this.photographers.map(data =>{
            const Template = new CardProfile(data)
            this.$dataWrapper.appendChild(Template.createCard())
        })
    }
    async main(){
        await this.fetchData()
        await this.displayProfil()   
    }
}

const app = new App()
app.main()