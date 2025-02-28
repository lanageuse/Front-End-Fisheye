/**
 * Manages likes functionality with event observers and storage management
 * @module likes
 */

import EventObserver from "../likes/EventObserver.js"
import Counter from "../likes/Counter.js"
import AddToStorage from '../likes/AddToStorage.js'

const params = new URLSearchParams(document.location.search);
const photographId = params.get("id");

/**
 * Initialize event observers and subscribers
 */
const EventLikes = new EventObserver()
const CounterLikes = new Counter()
const EventStorage = new EventObserver()
const LikeStorage = new AddToStorage()

// Set up event subscriptions
EventLikes.subscribe(CounterLikes)
EventStorage.subscribe(LikeStorage)

/**
 * Sets up like button functionality with click and keyboard handlers
 * @async
 */
export const handleLikes = async () => {
    const btnLikes = document.querySelectorAll('.handleLikes')

    /**
     * Handles like/unlike action for a button
     * @param {HTMLElement} btn - The like button element
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

    // Add click and keyboard event listeners to all like buttons
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