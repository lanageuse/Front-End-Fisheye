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
            likeCount = Number( likeWrapper.textContent)
            if(btn.classList.contains('liked')){
                likeCount = likeCount + 1
                EventLikes.notify("INC")
            }else{
                likeCount = likeCount - 1
                EventLikes.notify("DEC")
            }
            likeWrapper.textContent = likeCount
        })
    })
}
