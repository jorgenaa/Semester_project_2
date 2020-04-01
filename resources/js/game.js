//Fetching the localstorage content

let getPlayer1 = localStorage.getItem('Player1'),
    getPlayer2 = localStorage.getItem('Player2');

(() => {
    let player1Token = JSON.parse(localStorage.getItem('Player1Token'));
    let player2Token = JSON.parse(localStorage.getItem('Player2Token'));
    document.getElementById('get-player1-token').src = player1Token;
    document.getElementById('get-player2-token').src = player2Token;
    document.querySelector('.get-player-1').innerHTML = getPlayer1;
    document.querySelector('.get-player-2').innerHTML = getPlayer2;

    let token1 = document.getElementById('token1');
    token1.src = player1Token;
    let token2 = document.getElementById('token2');
    token2.src = player2Token;

})();
//Tokens for the tiles

let token1Wrapper = document.getElementById('token1-wrapper');
let token2Wrapper = document.getElementById('token2-wrapper');
token1Wrapper.style.display = 'none';
token2Wrapper.style.display = 'none';

//Tiles for the board game

let tilesContainer = document.querySelector('.game__tiles-container');

for (let i = 1; i < 31; i++) {
    tilesContainer.innerHTML += `<div class="game__tile" id="${i}"><span class="game__number">${i}</span></div>`;
}

// Array of traps

const traps = [{
        enemyTrap1: 'Pay tax penalty and go one step back'
    },
    {
        enemyTrap2: 'You are starving. Go two steps back and find something to eat'
    },
    {
        enemyTrap3: 'Deanerys’s Dragons have blocked the road ahead. Go three steps back'
    },
    {
        enemyTrap4: 'Some local farmers are in great danger and need your help. Go four steps back'
    },
    {
        enemyTrap5: 'A storm is coming. Go five steps back and take shelter'
    }
];

//Dice roll event function

let player1Total = 0,
    player2Total = 0,
    playerTurn = 1;

document.querySelector('#dice').addEventListener('click', rollDice);

function rollDice() {
    let status = document.getElementById('status');
    let modal = document.querySelector('.game__modal');
    let diceResult = Math.floor(Math.random() * 6) + 1;
    let dice = document.querySelector('.game__dice');
    dice.style.display = 'block';
    dice.src = '../resources/graphics/icons/dice-' + diceResult + '.png';
    dice.innerHTML = diceResult;

    let tile;

    let tokenWinner = document.getElementById('token-winner');
    let toggle1 = document.getElementsByClassName('game__token-toggle-1');
    let toggle2 = document.getElementsByClassName('game__token-toggle-2');

    // Close modal & refresh page event
    document.getElementById('close').addEventListener('click', function() {
        modal.style.display = 'none';
        window.location.reload();
    });

    // Token apperance condition
    if (playerTurn === 1) {
        player1Total = player1Total + diceResult;
        playerTurn = 2;
        token1Wrapper.style.display = 'block';
        tile = document.getElementById(player1Total);
        tile.appendChild(token1Wrapper);
    } else if (playerTurn === 2) {
        player2Total = player2Total + diceResult;
        playerTurn = 1;
        token2Wrapper.style.display = 'block';
        tile = document.getElementById(player2Total);
        tile.appendChild(token2Wrapper);
    }

    // Traps condition
    if (player1Total === 5) {
        status.innerHTML = traps[0].enemyTrap1;
        player1Total = player1Total - 1;
    } else if (player2Total === 5) {
        status.innerHTML = traps[0].enemyTrap1;
        player2Total = player1Total - 1;
    } else if (player1Total === 8) {
        status.innerHTML = traps[1].enemyTrap2;
        player1Total = player1Total - 2;
        traps[0].enemyTrap1 = "";
    } else if (player2Total === 8) {
        status.innerHTML = traps[1].enemyTrap2;
        player2Total = player2Total - 2;
        traps[0].enemyTrap1 = "";
    } else if (player1Total === 17) {
        status.innerHTML = traps[2].enemyTrap3;
        player1Total = player1Total - 3;
        traps[1].enemyTrap2 = "";
    } else if (player2Total === 17) {
        status.innerHTML = traps[2].enemyTrap3;
        player2Total = player1Total - 3;
        traps[1].enemyTrap2 = "";
    } else if (player1Total === 22) {
        status.innerHTML = traps[3].enemyTrap4;
        player1Total = player1Total - 4;
        traps[2].enemyTrap3 = "";
    } else if (player2Total === 22) {
        status.innerHTML = traps[3].enemyTrap4;
        player2Total = player2Total - 4;
        traps[2].enemyTrap3 = "";
    } else if (player1Total === 26) {
        status.innerHTML = traps[4].enemyTrap5;
        player1Total = player1Total - 5;
        traps[3].enemyTrap4 = "";
    } else if (player2Total === 26) {
        status.innerHTML = traps[4].enemyTrap5;
        player2Total = player2Total - 5;
        traps[3].enemyTrap4 = "";
    } else if (player1Total === 30 || player2Total > 31) {
        modal.style.display = 'block';
        player1Total = Math.round(30);
        tokenWinner.innerHTML = getPlayer1;
        toggle1.style.display = 'block';
        toggle2.style.display = 'none';
    } else if (player2Total === 30 || player2Total > 31) {
        modal.style.display = 'block';
        player2Total = Math.round(30);
        tokenWinner.innerHTML = getPlayer2;
        toggle2.style.display = 'block';
        toggle1.style.display = 'none';
    } else {
        status.innerHTML = '';
    }

    console.log('player1Total', player1Total);
    console.log('player2Total', player2Total);

}