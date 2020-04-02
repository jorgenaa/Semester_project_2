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

const traps = {
	5: {
		description: 'Pay tax penalty and go one step back',
		penalty: 1
	},
	8: {
		description: 'You are starving. Go two steps back and find something to eat',
		penalty: 2
	},

	17: {
		description: 'Deanerys’s Dragons have blocked the road ahead. Go three step back',
		penalty: 3
	},
	22: {
		description: 'Some local farmers are in great danger and need your help. Go four steps back',
		penalty: 4
	},

	26: {
		description: 'A storm is coming. Go five steps back and take shelter',
		penalty: 5
	}
};

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

	// Close modal & refresh page event
	document.getElementById('close').addEventListener('click', function(e) {
		modal.style.display = 'none';
		window.location.reload();
		e.stopPropagation();
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

	//Traps condition
	if ('undefined' !== typeof traps[player1Total]) {
		let player1Penalty = traps[player1Total];
		status.innerHTML = player1Penalty.description;
		player1Total -= player1Penalty.penalty;

	} else if ('undefined' !== typeof traps[player2Total]) {
		let player2Penalty = traps[player2Total];
		status.innerHTML = player2Penalty.description;
		player2Total -= player2Penalty.penalty;
	} else if (player1Total >= 30) {
		modal.style.display = 'block';
		player1Total = Math.round(30);
		tokenWinner.innerHTML = getPlayer1;
	} else if (player2Total >= 30) {
		modal.style.display = 'block';
		player2Total = Math.round(30);
		tokenWinner.innerHTML = getPlayer2;
	} else {
		status.innerHTML = '';
	}

	console.log('player1Total', player1Total);
	console.log('player2Total', player2Total);
}

// function move token backwards
function moveTokenback() {

}