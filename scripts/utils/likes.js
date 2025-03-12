/**
 * Gère la fonctionnalité des likes avec des observateurs d'événements et la gestion du stockage
 * @module likes
 */

import EventObserver from "../likes/EventObserver.js"
import Counter from "../likes/Counter.js"
import AddToStorage from '../likes/AddToStorage.js'

const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");

/**
 * Initialise les observateurs d'événements et les abonnés
 */
const EventLikes = new EventObserver()
const CounterLikes = new Counter()
const EventStorage = new EventObserver()
const LikeStorage = new AddToStorage()

// Configuration des abonnements aux événements
EventLikes.subscribe(CounterLikes)
EventStorage.subscribe(LikeStorage)

/**
 * Configure la fonctionnalité des boutons like avec gestion des clics et du clavier
 * @async
 */
export const handleLikes = async () => {
    const btnLikes = document.querySelectorAll('.handleLikes')

    /**
     * Gère l'action like/unlike pour un bouton
     * @param {HTMLElement} btn - L'élément bouton like
     */
    const handleLike = (btn) => {
        const likeWrapper = btn.querySelector('.count')
        const media_id = btn.dataset.id
        const photograph_id = photographId
        let likeCount = 0

        btn.classList.toggle('liked')
        likeCount = Number(likeWrapper.textContent)

        if (btn.classList.contains('liked')) {
            likeCount = likeCount + 1
            EventLikes.notify("INC")
            EventStorage.notify("ADD", {media_id, photograph_id})
        } else {
            likeCount = likeCount - 1
            EventLikes.notify("DEC")
            EventStorage.notify("DEL", {media_id, photograph_id})
        }
        likeWrapper.textContent = likeCount
    }

    // Ajout des écouteurs d'événements clic et clavier à tous les boutons like
    btnLikes.forEach((btn) => {
        btn.addEventListener("click", () => {
            handleLike(btn)
        })
        btn.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                handleLike(btn)
            }
        })
    })
}