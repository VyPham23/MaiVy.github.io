
const suits = ["spades", "diamonds", "club", "heart"];
const values = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];


let deck = [];

const random = () => {
    
    deck = [];
    for (let i = 0; i < values.length; i++) {
      suits.forEach(item => {
        deck.push({ value: values[i], suit: item });
      })
    }
}

const shuffle = () => {
    
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}


const drawDeck = () => {
    const container = document.getElementById("container");
    container.innerHTML = '';
    deck.forEach(item => {
      const cardImg = document.createElement("img");
      cardImg.src = `./img/cards/${item.value}_of_${item.suit}.png`;
      cardImg.classList.add("card");
      container.appendChild(cardImg);
    })
}
  
const createDeck = () => {
    random();
    drawDeck();
}

const reset = () => {
    shuffle();
    drawDeck();
}