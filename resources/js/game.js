let player1Total = 0,
	player2Total = 0,
	playerTurn = 1;

//Fetching the localstorage content

(function getLocalStorageItems() {
	let getPlayer1 = localStorage.getItem("Player1");
	getPlayer2 = localStorage.getItem("Player2");
	player1Token = JSON.parse(localStorage.getItem("Player1Token"));
	player2Token = JSON.parse(localStorage.getItem("Player2Token"));
	document.getElementById("get-player1-token").src = player1Token;
	document.getElementById("get-player2-token").src = player2Token;
	document.querySelector(".get-player-1").innerHTML = getPlayer1;
	document.querySelector(".get-player-2").innerHTML = getPlayer2;

	let token1 = document.getElementById("token1");
	token1.src = player1Token;
	let token2 = document.getElementById("token2");
	token2.src = player2Token;
})();

//Tokens for the tiles

let token1Wrapper = document.getElementById("token1-wrapper");
let token2Wrapper = document.getElementById("token2-wrapper");
token1Wrapper.style.display = "none";
token2Wrapper.style.display = "none";

//Tiles for the board game

let tilesContainer = document.querySelector(".game__tiles-container");

for (let i = 1; i < 31; i++) {
	tilesContainer.innerHTML += `<div class="game__tile" id="${i}"><span class="game__number">${i}</span></div>`;
}

// Array of traps

const traps = {
	6: {
		description: "Pay tax penalty and go one step back",
		penalty: 1
	},
	9: {
		description: "You are starving. Go two steps back and find something to eat",
		penalty: 2
	},

	18: {
		description: "Deanerys’s Dragons have blocked the road ahead. Go three step back",
		penalty: 3
	},
	23: {
		description: "Some local farmers are in great danger and need your help. Go four steps back",
		penalty: 4
	},

	27: {
		description: "A storm is coming. Go five steps back and take shelter",
		penalty: 5
	}
};

//Dice roll event function

document.querySelector("#dice").addEventListener("click", rollDice);

function rollDice() {
	let status = document.getElementById("status");
	let modalStatus = document.getElementById("modal-status");
	let modalWinner = document.querySelector(".game__modal--winner");
	let modalPenalty = document.querySelector(".game__modal--penalty");
	let diceResult = Math.floor(Math.random() * 6) + 1;
	let dice = document.querySelector(".game__dice");
	dice.style.display = "block";
	dice.src = "../resources/graphics/icons/dice-" + diceResult + ".png";
	dice.innerHTML = diceResult;

	let tile;

	let tokenWinner = document.getElementById("token-winner");
	let tokenWinner1 = document.querySelector(".game__token-wrapper--toggle-1");
	let tokenWinner2 = document.querySelector(".game__token-wrapper--toggle-2");

	// Close modal event
	document.getElementById("close1").addEventListener("click", function(e) {
		modalPenalty.style.display = "none";
		e.stopPropagation();
	});

	document.getElementById("modal-penalty").addEventListener("click", function(e) {
		modalPenalty.style.display = "none";

		e.stopPropagation();
	});

	// Close modal & refresh page event
	document.getElementById("close2").addEventListener("click", function(e) {
		modalWinner.style.display = "none";
		window.location.reload();
		e.stopPropagation();
	});


	// Token apperance condition
	if (playerTurn === 1) {
		player1Total = player1Total + diceResult;
		playerTurn = 2;
		token1Wrapper.style.display = "block";

		// see if this total is a trap
		// try get the trap from the traps object using brackets notation instead of dot notation
		const trap = traps[player1Total];

		console.log("trap", trap);

		// if the trap exists, minus the penalty from the total
		if (trap) {
			let player1Status = traps[player1Total];
			player1Total = player1Total - trap.penalty;
			modalPenalty.style.display = 'block';
			modalStatus.innerHTML = player1Status.description;
		}

		tile = document.getElementById(player1Total);
		tile.appendChild(token1Wrapper);
	} else if (playerTurn === 2) {
		player2Total = player2Total + diceResult;
		playerTurn = 1;
		token2Wrapper.style.display = "block";
		tile = document.getElementById(player2Total);
		tile.appendChild(token2Wrapper);
	}

	//Traps condition
	if ("undefined" !== typeof traps[player1Total]) {
		let player1Penalty = traps[player1Total];
		//status.innerHTML = player1Penalty.description;
		//modalStatus.innerHTML = player1Penalty.description;
		player1Total -= player1Penalty.penalty;
	} else if ("undefined" !== typeof traps[player2Total]) {
		let player2Penalty = traps[player2Total];
		//status.innerHTML = player2Penalty.description;
		modalStatus.innerHTML = player2Penalty.description;
		player2Total -= player2Penalty.penalty;
	} else if (player1Total >= 30) {
		modalWinner.style.display = "block";
		//player1Total = Math.round(30);
		tokenWinner.innerHTML = getPlayer1;
		tokenWinner1.style.display = "block";
	} else if (player2Total >= 30) {
		modalWinner.style.display = "block";
		//player2Total = Math.round(30);
		tokenWinner.innerHTML = getPlayer2;
		tokenWinner2.style.display = "block";
	} else {
		status.innerHTML = "";
	}

	console.log("player1Total", player1Total);
	console.log("player2Total", player2Total);
}

// function move token backwards
function moveTokenback() {}