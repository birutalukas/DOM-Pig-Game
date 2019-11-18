/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, diceDOM;

diceDOM = document.querySelector('.dice');

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    roundScoreReset();
    hideDice();
}
function roundScoreReset() {
    roundScore = document.querySelector('#current-' + activePlayer).textContent = 0;
}
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
function hideDice() {
    diceDOM.style.display = 'none';
}
newGame();

// New Game Button
document.querySelector('.btn-new').addEventListener('click', function() {
    newGame();
});

// Roll the Dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    // Generate random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // Show current dice image after roll
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // Add random number to round score if number is not equal to 1
    if (dice !== 1) {
        roundScore = document.querySelector('#current-' + activePlayer).textContent = roundScore += dice;       
    } else {
        hideDice();
        roundScoreReset();
        nextPlayer();
    }
});

// Hold Score when Hold button is pushed
document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add Round to Global Score
    scores[activePlayer] += roundScore;
    // Check for Winner
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        roundScoreReset();
        hideDice();
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
    // Print updated Global Score
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    roundScoreReset();
    nextPlayer();
    }
});