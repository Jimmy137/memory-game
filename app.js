const cardArr = [
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

cardArr.sort(()=> 0.1 - Math.random())

let cardsChosen = []
let cardsChosenIds = []
let solvedIds = []

const scoreDisplay = document.querySelector('#score')
let score = 0
scoreDisplay.innerHTML = score

const cardGrid = document.querySelector('.grid')

const generate = ()=>{
    for (let i = 0; i < cardArr.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        cardGrid.append(card)
    }
}

generate()
console.log(cardArr)
function checkMatch () {
    const cards = document.querySelectorAll('img')
    if (cardsChosen[0] == cardsChosen[1] && cardsChosenIds[0] != cardsChosenIds[1] ){
        score +=1
        score < 6 ? alert('You got a match') : alert('You Won')
        
        scoreDisplay.innerHTML = score
        cards[cardsChosenIds[0]].setAttribute('src', 'images/white.png')
        cards[cardsChosenIds[1]].setAttribute('src', 'images/white.png')
        solvedIds.push(cardsChosenIds[0], cardsChosenIds[1])
        cardsChosen = [] 
        cardsChosenIds = []
    }
    else{
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
        cardsChosen.shift()
        cardsChosenIds.shift()
    }
}

function flipCard (){
    const idx = this.getAttribute('data-id')
    if (! solvedIds.includes(idx)){    
        cardsChosen.push(cardArr[idx].name)
        cardsChosenIds.push(idx)

        console.log(cardsChosen)

        this.setAttribute('src', cardArr[idx].img)

        if (cardsChosen.length > 1) {
            setTimeout(checkMatch, 300)
        }
    }
}




