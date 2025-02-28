/**
 * Implements the Observer pattern for managing event subscriptions
 * @class
 */
class EventObserver {
    /**
     * Creates a new EventObserver instance
     * Initializes an empty array of observers
     */
    constructor() {
        this._observers = []
    }

    /**
     * Adds a new observer to the subscription list
     * @param {Object} observer - The observer object to subscribe
     * @param {Function} observer.update - The update method that will be called on notification
     */
    subscribe(observer) {
        this._observers.push(observer)
    }

    /**
     * Removes an observer from the subscription list
     * @param {Object} observer - The observer object to unsubscribe
     */
    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    /**
     * Notifies all subscribed observers with an action and optional data
     * @param {string} action - The action to notify observers about
     * @param {*} [data=[]] - Optional data to pass to observers
     */
    notify(action, data = []) {
        this._observers.forEach(observer => observer.update(action, data))
    }
}

export default EventObserver