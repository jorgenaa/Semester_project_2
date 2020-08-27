//Fetching the localstorage content and manipulate the DOM

const localStorageItems = {
	getPlayer1: localStorage.getItem('Player1'),
	getPlayer2: localStorage.getItem('Player2'),
	player1Token: JSON.parse(localStorage.getItem('Player1Token')),
	player2Token: JSON.parse(localStorage.getItem('Player2Token')),
	token1Wrapper: document.getElementById('token1-wrapper'),
	token2Wrapper: document.getElementById('token2-wrapper'),
	getLocalStorageItems() {
		document.getElementById('get-player1-token').src = this.player1Token;
		document.getElementById('get-player2-token').src = this.player2Token;
		document.querySelector('.get-player-1').innerHTML = this.getPlayer1;
		document.querySelector('.get-player-2').innerHTML = this.getPlayer2;

		var token1 = document.getElementById('token1');
		token1.src = this.player1Token;
		var token2 = document.getElementById('token2');
		token2.src = this.player2Token;

		//Tokens for the tiles

		this.token1Wrapper.style.display = 'none';
		this.token2Wrapper.style.display = 'none';
	},
};

localStorageItems.getLocalStorageItems();

//Tiles for the board game

const tilesContainer = document.querySelector('.tiles');
for (var i = 1; i < 31; i++) {
	tilesContainer.innerHTML += `<div class="tiles__tile" id="${i}"><span class="tiles__number">${i}</span></div>`;
}

// Array of traps

const traps = {
	5: {
		description: 'Pay tax penalty and go one step back',
		penalty: -1,
	},
	8: {
		description:
			'You are starving. Go two steps back and find something to eat',
		penalty: -2,
	},

	17: {
		description:
			'Deanerys’s Dragons have blocked the road ahead. Go three step back',
		penalty: -3,
	},
	22: {
		description:
			'Some local farmers are in great danger and need your help. Go four steps back',
		penalty: -4,
	},

	26: {
		description: 'A storm is coming. Go five steps back and take shelter',
		penalty: -5,
	},
};

//Module pattern function
let boardGame = (function () {
	var player1Total = 0,
		player2Total = 0,
		playerTurn = 1,
		tile,
		trap,
		dice = document.querySelector('.sidebar__dice'),
		currentScorePlayer1 = document.getElementById('currentScorePlayer1'),
		currentScorePlayer2 = document.getElementById('currentScorePlayer2'),
		winner = document.getElementById('winner'),
		modalStatus = document.getElementById('modal-status'),
		playerStatus,
		modalWinner = document.querySelector('.modal--winner'),
		modalPenalty = document.querySelector('.modal--penalty');
		dice.style.display = 'block';

	// Modal providing information of the traps
	document
		.getElementById('modal-penalty')
		.addEventListener('click', function () {
			modalPenalty.style.display = 'none';
		});

	// Close modal event
	document.getElementById('close1').addEventListener('click', function () {
		modalPenalty.style.display = 'none';
	});

	// Close modal & refresh page event
	document.getElementById('close2').addEventListener('click', function () {
		modalWinner.style.display = 'none';
		window.location.reload();
		localStorage.removeItem('TokenWinner1');
		localStorage.removeItem('TokenWinner2');
		localStorage.removeItem('PlayerWinner');
	});

	return {
		rollDice(event) {
			event.preventDefault();
			var diceResult = Math.floor(Math.random() * 6) + 1;
			dice.src = 'graphics/icons/dice-' + diceResult + '.png';
			dice.innerHTML = diceResult;

			(function tokensInstance() {
				if (playerTurn === 1) {
					playerTurn = 2;
					player1Total = player1Total + diceResult;
				
					if (player1Total > 30) {
						player1Total = 30;
					}
					currentScorePlayer1.innerHTML = player1Total;
					localStorageItems.token1Wrapper.style.display = 'block';
					tile = document.getElementById(player1Total);
					tile.appendChild(localStorageItems.token1Wrapper);
					trap = traps[player1Total];
					//Traps condition
					if (trap) {
						player1Total = player1Total + trap.penalty;
						playerStatus = trap.description;
						modalPenalty.style.display = 'block';
						modalStatus.innerHTML = playerStatus;
					}
				} else if (playerTurn === 2) {
					playerTurn = 1;
					player2Total = player2Total + diceResult;
					if (player2Total > 30) {
						player2Total = 30;
					}
					currentScorePlayer2.innerHTML = player2Total;
					localStorageItems.token2Wrapper.style.display = 'block';
					tile = document.getElementById(player2Total);
					tile.appendChild(localStorageItems.token2Wrapper);
					trap = traps[player2Total];
					//Traps condition
					if (trap) {
						player2Total = player2Total + trap.penalty;
						playerStatus = trap.description;
						modalPenalty.style.display = 'block';
						modalStatus.innerHTML = playerStatus;
					}
				}
			})();

			(function displayWinner() {
				if (player1Total >= 30) {
					localStorage.setItem(
						'TokenWinner1',
						JSON.stringify(localStorageItems.player1Token)
					);
					localStorage.setItem('PlayerWinner', localStorageItems.getPlayer1);
					modalWinner.style.display = 'block';
					winner.innerHTML = localStorageItems.getPlayer1;
				} else if (player2Total >= 30) {
					localStorage.setItem(
						'TokenWinner2',
						JSON.stringify(localStorageItems.player2Token)
					);
					localStorage.setItem('PlayerWinner', localStorageItems.getPlayer2);
					modalWinner.style.display = 'block';
					winner.innerHTML = localStorageItems.getPlayer2;
				}
			})();
		},
		
	};
})();

//Dice roll event
document.querySelector('#dice').addEventListener('click', boardGame.rollDice);
