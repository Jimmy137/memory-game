const cardArr = [
  {
    name: 'taco',
    img: 'images/taco.png'
  },
  {
    name: 'egg',
    img: 'images/egg.png'
  },
  {
    name: 'vegetables',
    img: 'images/vegetables.png'
  },
  {
    name: 'donut',
    img: 'images/donut.png'
  },
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'taco',
    img: 'images/taco.png'
  },
  {
    name: 'egg',
    img: 'images/egg.png'
  },
  {
    name: 'vegetables',
    img: 'images/vegetables.png'
  },
  {
    name: 'donut',
    img: 'images/donut.png'
  },
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  }
]
const nums = cardArr.map((item, i) => i)

cardArr.sort(()=> 0.1 - Math.random())

let cardsChosen = []
let cardsChosenIds = []
let solvedIds = []

const scoreDisplay = document.querySelector('#score')
let score = 0
scoreDisplay.innerHTML = score

const options = document.querySelector('.options')
const next = document.querySelector('.next')
const h2 = document.querySelector('h2')
const cardGrid = document.querySelector('.grid')

nums.sort(()=> 0.1 - Math.random())
console.log(nums)

const generate = ()=>{
    for (let i = 0; i < cardArr.length; i++){
        const card = document.createElement('div')
        card.classList.add('flip-card')
        card.setAttribute('data-id', i)

        const cardInner = document.createElement('div')
        cardInner.classList.add('flip-card-inner')

        const cardFront = document.createElement('div')
        cardFront.classList.add('flip-card-front')
        
        const cardImg = document.createElement('img')
        cardImg.setAttribute('src', 'images/blank.png')
        card.addEventListener('click', flipCard)

        cardFront.appendChild(cardImg)
        cardInner.appendChild(cardFront)
        // cardInner.appendChild(cardBack)
        card.appendChild(cardInner)
        card.style.animationDelay = (nums[Math.floor(Math.random()*cardArr.length)]/6).toString() + 's'
        card.style.animationDuration = (i/6).toString() + 's'

        // (Math.floor(Math.random()*cardArr.length))
        cardGrid.append(card)
    }
}


function checkMatch () {
    const cards = document.querySelectorAll('.flip-card')
    if (cardsChosen[0] == cardsChosen[1] && cardsChosenIds[0] != cardsChosenIds[1] ){
        score +=1
        score == cardArr.length / 2 && alert('You Won 🎉')
        
        scoreDisplay.innerHTML = score
        cards[cardsChosenIds[0]].childNodes[0].childNodes[1].childNodes[0].setAttribute('src', 'images/check.png')
        cards[cardsChosenIds[0]].childNodes[0].childNodes[1].childNodes[0].setAttribute('width', '100px')
        cards[cardsChosenIds[1]].childNodes[0].childNodes[1].childNodes[0].setAttribute('src', 'images/check.png')
        cards[cardsChosenIds[1]].childNodes[0].childNodes[1].childNodes[0].setAttribute('width', '100px')
        solvedIds.push(cardsChosenIds[0], cardsChosenIds[1])
        cardsChosen = [] 
        cardsChosenIds = []
    }
    else{
        cards[cardsChosenIds[0]].classList.remove('clicked')
        cards[cardsChosenIds[0]].childNodes[0].childNodes[1].remove()
        // cards[cardsChosenIds[1]].classList.remove('clicked')
        // cards[cardsChosenIds[1]].childNodes[0].childNodes[1].remove()
        cardsChosen.shift()
        cardsChosenIds.shift()
    }
}

function flipCard (){
    const idx = this.getAttribute('data-id')
    const clickedCard = document.querySelector(`[data-id="${idx}"] .flip-card-inner`)

    this.classList.add('clicked')
    if (! solvedIds.includes(idx)){    
        cardsChosen.push(cardArr[idx].name)
        cardsChosenIds.push(idx)
        console.log('ccccccc', cardsChosen, cardsChosenIds)

        console.log(cardsChosen)

        const cardBack = document.createElement('div')
        cardBack.classList.add('flip-card-back')
        const Img = document.createElement('img')
        Img.setAttribute('src', cardArr[idx].img)
        cardBack.appendChild(Img)
        clickedCard.appendChild(cardBack)

        if (cardsChosen.length > 1) {
            setTimeout(checkMatch, 500)
        }
    }
}

function pickTime (time) {
    const timerDiv = document.querySelector('.timer')
    next.style.display = 'none'
    timerDiv.style.display = 'flex'
    h2.style.display = 'flex'
    cardGrid.style.display = 'flex'
    generate()

    console.log('ttttttttttttttttt', time)

    let durationInMillis = time * 1000;

    setTimeout(() => {
        let x = setInterval(function() {
        let remainingTime = durationInMillis -= 10; 
        console.log('ttttttttttttttttt', remainingTime)
        
        let seconds = Math.floor(remainingTime / 1000);
        let milliseconds = Math.floor((remainingTime % 1000));

        timerDiv.innerHTML = seconds + ":" + milliseconds;
        
        if (remainingTime <= 10000 ) {
            timerDiv.style.color = "red";
            timerDiv.style.animation = "beat 2s infinite both"
        }

        if (score == (cardArr.length / 2) ) {
            clearInterval(x);
        }

        if (remainingTime <= 0 ) {
            clearInterval(x);
            timerDiv.style.color = "black";
            timerDiv.style.animation = "none"
            timerDiv.innerHTML = "Time's up!";
            alert('You Lose :( Refresh page to try again!')
            cardGrid.style.pointerEvents = 'none'

        }
        }, 10);
    }, 3000)
}

function decide (decision) {
    if (decision === 'yes') {
        options.style.display = 'none';
        next.style.display = 'flex';

        const thirtyButton = document.querySelector('#thirty')
        const sixtyButton = document.querySelector('#sixty')
        const ninetyButton = document.querySelector('#ninety')
        thirtyButton.addEventListener('click', () => pickTime(30))
        sixtyButton.addEventListener('click', () => pickTime(60))
        ninetyButton.addEventListener('click', () => pickTime(90))
    } else {
        options.style.display = 'none'
        h2.style.display = 'flex'
        cardGrid.style.display = 'flex'
        generate()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.querySelector('#yes')
    const noButton = document.querySelector('#no')
    yesButton.addEventListener('click', () => decide('yes'))
    noButton.addEventListener('click', () => decide('no'))

})



