let player1Total = 0,
	player2Total = 0,
	playerTurn = 1;

//Fetching the localstorage content

(function getLocalStorageItems() {
	this.getPlayer1 = localStorage.getItem('Player1');
	this.getPlayer2 = localStorage.getItem('Player2');
	this.player1Token = JSON.parse(localStorage.getItem('Player1Token'));
	this.player2Token = JSON.parse(localStorage.getItem('Player2Token'));
	document.getElementById('get-player1-token').src = this.player1Token;
	document.getElementById('get-player2-token').src = this.player2Token;
	document.querySelector('.get-player-1').innerHTML = this.getPlayer1;
	document.querySelector('.get-player-2').innerHTML = this.getPlayer2;

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
for (var i = 1; i < 31; i++) {
	tilesContainer.innerHTML += `<div class="game__tile" id="${i}"><span class="game__number">${i}</span></div>`;
}

// Array of traps

const traps = {
	5: {
		description: 'Pay tax penalty and go one step back',
		penalty: -1
	},
	8: {
		description: 'You are starving. Go two steps back and find something to eat',
		penalty: -2
	},

	17: {
		description: 'Deanerys’s Dragons have blocked the road ahead. Go three step back',
		penalty: -3
	},
	22: {
		description: 'Some local farmers are in great danger and need your help. Go four steps back',
		penalty: -4
	},

	26: {
		description: 'A storm is coming. Go five steps back and take shelter',
		penalty: -5
	}
};

//Dice roll event function

document.querySelector('#dice').addEventListener('click', rollDice);

function rollDice() {
	var tile,
		totalScore1 = document.getElementById('totalScore1'),
		totalScore2 = document.getElementById('totalScore2'),
		winner = document.getElementById('winner'),
		modalStatus = document.getElementById('modal-status'),
		player1Status,
		player2Status,
		modalWinner = document.querySelector('.game__modal--winner'),
		modalPenalty = document.querySelector('.game__modal--penalty'),
		diceResult = Math.floor(Math.random() * 6) + 1,
		dice = document.querySelector('.game__dice');
	dice.style.display = 'block';
	dice.src = 'graphics/icons/dice-' + diceResult + '.png';
	dice.innerHTML = diceResult;

	// Close modal event
	document.getElementById('close1').addEventListener('click', function() {
		modalPenalty.style.display = 'none';
	});
	document.getElementById('modal-penalty').addEventListener('click', function() {
		modalPenalty.style.display = 'none';

	});

	// Close modal & refresh page event
	document.getElementById('close2').addEventListener('click', function() {
		modalWinner.style.display = 'none';
		window.location.reload();
		localStorage.removeItem('TokenWinner');
		localStorage.removeItem('PlayerWinner');

	});

	// Token apperance condition
	if (playerTurn === 1) {
		player1Total = player1Total + diceResult;
		playerTurn = 2;
		totalScore1.innerHTML = player1Total;
		token1Wrapper.style.display = 'block';
		tile = document.getElementById(player1Total);
		tile.appendChild(token1Wrapper);
		// see if this total is a trap
		// try get the trap from the traps object using brackets notation instead of dot notation
		//const trap = traps[player1Total];
		const trap = traps[player1Total];
		console.log('trap', trap);

		// if the trap exists, minus the penalty from the total
		//Traps condition
		if (trap) {
			player1Status = traps[player1Total];
			player1Total = player1Total + trap.penalty;
			modalPenalty.style.display = 'block';
			modalStatus.innerHTML = player1Status.description;

		}
	} else if (playerTurn === 2) {
		player2Total = player2Total + diceResult;
		playerTurn = 1;
		totalScore2.innerHTML = player2Total;
		token2Wrapper.style.display = 'block';
		tile = document.getElementById(player2Total);
		tile.appendChild(token2Wrapper);
		trap = traps[player2Total];
		if (trap) {
			player2Status = traps[player2Total];
			player2Total = player2Total + trap.penalty;
			modalPenalty.style.display = 'block';
			modalStatus.innerHTML = player2Status.description;
		}
	}
	if (player1Total >= 30) {
		localStorage.setItem('TokenWinner1', JSON.stringify(player1Token));
		localStorage.setItem('PlayerWinner', getPlayer1);
		modalWinner.style.display = 'block';
		winner.innerHTML = getPlayer1;

	} else if (player2Total >= 30) {
		localStorage.setItem('TokenWinner2', JSON.stringify(player2Token));
		localStorage.setItem('PlayerWinner', getPlayer2);
		modalWinner.style.display = 'block';
		winner.innerHTML = getPlayer2;

	}
	console.log('player1Total', player1Total);
	console.log('player2Total', player2Total);

}