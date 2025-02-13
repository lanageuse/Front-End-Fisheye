import EventObserver from "../likes/EventObserver.js"
import Counter from "../likes/Counter.js"


const EventLikes = new EventObserver()
const CounterLikes = new Counter()
EventLikes.subscribe(CounterLikes)

export const handleLikes = async () => {
    const btnLikes = document.querySelectorAll('.handleLikes')
    btnLikes.forEach((btn) => {
        btn.addEventListener("click", () => {
            let likeCount = 0
            btn.classList.toggle('liked')
            const likeWrapper = btn.querySelector('.count')
            likeCount = Number( likeWrapper.getHTML())
            likeWrapper.textContent = btn.classList.contains('liked') ? likeCount + 1 : likeCount - 1  
            btn.classList.contains('liked') ? EventLikes.notify('INC') : EventLikes.notify('DEC')
        })
    })
}
