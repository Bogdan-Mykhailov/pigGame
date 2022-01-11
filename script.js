'use strict';

// NEW PROJECT PIG GAME

// //naznachil elementu
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// //sbrosil znacheniya score0 i score1 na 0
score0El.textContent = 0;
score1El.textContent = 0;
//skril dice element
diceEl.classList.add('hidden');

// // PS jonas variant

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

// // PS

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice functionality
btnRoll.addEventListener('click', function () {
  // 1. sozdaem randomnoe chislo dlya dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. pokazuvaem dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. proveriaem ili dice ne 1
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. dobavit tekushiy schet k aktivnomu
  if (playing) {
    scores[activePlayer] += currentScore;

    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. proverit ili schet >= 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// // PS moi variant

// // btnNew.addEventListener('click', function () {
// //   playing = true;
// //   scores = [0, 0];
// //   score0El.textContent = 0;
// //   score1El.textContent = 0;

// //   currentScore = 0;

// //   document.getElementById(`current--${activePlayer}`).textContent = 0;

// //   player1El.classList.remove('player--winner');
// //   player1El.classList.remove('player--winner');

// //   player0El.classList.add('player--active');
// //   player1El.classList.remove('player--active');

// //   document
// //     .querySelector(`.player--${activePlayer}`)
// //     .classList.remove('player--winner');

// //   diceEl.classList.add('hidden');
// // });

// // PS variant Jonas

btnNew.addEventListener('click', init);
