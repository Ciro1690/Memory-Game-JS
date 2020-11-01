const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = '#ccc'
    newDiv.id = 'card-id'
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

document.querySelector('button').addEventListener('click', function() {
  createDivsForColors(shuffledColors);
  const buttonDiv = document.querySelector('.button-div')
  buttonDiv.style.display = 'none'
})

let firstCard, secondCard;

function handleCardClick(event) {
    if (firstCard === undefined) {
      firstCard = event.target;
      firstCard.style.backgroundColor = event.target.classList;
    } else if (secondCard === undefined) {
      if (event.target !== firstCard) {
        secondCard = event.target
        secondCard.style.backgroundColor = event.target.classList;
        document.body.style.pointerEvents = 'none'
        checkForMatch(firstCard, secondCard)
        firstCard = undefined;
        secondCard = undefined;
        gameWon()
      }
    }
}

function checkForMatch(firstCard, secondCard) {
  if (firstCard.classList.value === secondCard.classList.value) {
    firstCard.removeEventListener('click', handleCardClick)
    firstCard.classList.add('flipped')
    secondCard.removeEventListener('click', handleCardClick)
    secondCard.classList.add('flipped')
    setTimeout(function() {
      document.body.style.pointerEvents = 'auto' 
    }, 1000)
    } else {
      unflipCards(firstCard, secondCard)
    }
}

function unflipCards(firstCard, secondCard) {
  setTimeout(function() {
    firstCard.style.backgroundColor = '#ccc';
    secondCard.style.backgroundColor = '#ccc';  
    document.body.style.pointerEvents = 'auto' 
  }, 1000)
}

function gameWon() {
  let cards = document.querySelectorAll('#card-id')
  let cardsArray = Array.prototype.slice.call(cards);

  const isFlipped = (card) => card.classList.contains('flipped')  

  if (cardsArray.every(isFlipped)) {
      let win = document.querySelector('#win')
      win.innerHTML = "Congrats, you won!"
      setTimeout(function() {
        win.innerHTML = ""
      }, 2000)
      resetGame()
    }
}
function resetGame() {
  const button = document.createElement('button')
  const buttonDiv = document.querySelector('#reset-button')
  button.innerHTML = "Play again?"
  buttonDiv.append(button);

  buttonDiv.addEventListener('click', function () {
    location.reload()
    buttonDiv.remove()
  })
}

