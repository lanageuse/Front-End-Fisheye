import Api from '../api/Api.js' 
import Photograph from '../models/Photograph.js'
import CardProfile from '../templates/CardProfile.js'

class Index{
    constructor(){
        this.photographers = []
        this.dataApi = new Api('./data/photographers.json')
        this.$wrapper = document.getElementById('main')
        this.$dataWrapper = document.querySelector('.photographer_section')
        this.dataLocal= localStorage.getItem("photographers") || null
    }

    async fetchData(){
        if(this.dataLocal){
            const photographers = JSON.parse(this.dataLocal)
            this.photographers = photographers.map(photograph => new Photograph(photograph))
        }else{
            const {photographers, media}  = await this.dataApi.get()
            this.photographers = photographers.map(photograph => new Photograph(photograph))
            this.saveData(this.photographers, "photographers")
        }
        return this.photographers
    }

    saveData(data, item){
        localStorage.setItem(item, JSON.stringify(data))
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