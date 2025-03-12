/**
 * Implémente le patron de conception Observateur pour gérer les souscriptions aux événements
 * @class
 */
class EventObserver {
    /**
     * Crée une nouvelle instance d'EventObserver
     * Initialise un tableau vide d'observateurs
     */
    constructor() {
        this._observers = []
    }

    /**
     * Ajoute un nouvel observateur à la liste des souscriptions
     * @param {Object} observer - L'objet observateur à souscrire
     * @param {Function} observer.update - La méthode update qui sera appelée lors de la notification
     */
    subscribe(observer) {
        this._observers.push(observer)
    }

    /**
     * Supprime un observateur de la liste des souscriptions
     * @param {Object} observer - L'objet observateur à désinscrire
     */
    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    /**
     * Notifie tous les observateurs souscrits avec une action et des données optionnelles
     * @param {string} action - L'action pour laquelle notifier les observateurs
     * @param {*} [data=[]] - Données optionnelles à transmettre aux observateurs
     */
    notify(action, data = []) {
        this._observers.forEach(observer => observer.update(action, data))
    }
}

export default EventObserver