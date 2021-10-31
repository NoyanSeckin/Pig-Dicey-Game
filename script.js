'use strict';

//Selecting Elements
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
let score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Initial values
let playing = true;
let sum = 0;
const scores = [0, 0];
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;

//Defining functions
function hide(el) {
  el.classList.add('hidden');
}

function reveal(el) {
  el.classList.remove('hidden');
}

function switchPlayer() {
  sum = 0;
  document.getElementById('current--' + activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //This part of the code removes the first players active class and adds it to the second player. Then, in the next round it does the opposite because it is toggle.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function startGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  sum = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  playing = true;
}

//Real events begin
hide(diceImg);
btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomDice = Math.ceil(Math.random() * 6);
    diceImg.setAttribute('src', 'dice-' + randomDice + '.png');
    reveal(diceImg);
    if (randomDice > 1) {
      sum += randomDice;
      //Dynamic id name
      document.getElementById('current--' + activePlayer).textContent = sum;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += sum;
    document.getElementById('score--' + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      hide(diceImg);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', startGame);
