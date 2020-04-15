(function getLocalStorageItems() {
	var playerWinner = localStorage.getItem('PlayerWinner');
	var tokenWinner1 = JSON.parse(localStorage.getItem('TokenWinner1'));
	var tokenWinner2 = JSON.parse(localStorage.getItem('TokenWinner2'));
	document.getElementById('get-winner-token-1').src = tokenWinner1;
	document.getElementById('get-winner-token-2').src = tokenWinner2;
	document.getElementById('playerWinner').innerHTML = playerWinner;
	var tokenWinnerToggle1 = document.querySelector('.game__token-wrapper--toggle-1');
	var tokenWinnerToggle2 = document.querySelector('.game__token-wrapper--toggle-2');

	localStorage.removeItem('TokenWinner1');
	localStorage.removeItem('TokenWinner2');
	localStorage.removeItem('PlayerWinner');
	localStorage.removeItem('Player1');
	localStorage.removeItem('Player2');
	localStorage.removeItem('Player1Token');
	localStorage.removeItem('Player2Token');

	if (tokenWinner1) {
		tokenWinnerToggle2.style.display = 'none';
	} else if (tokenWinner2) {
		tokenWinnerToggle1.style.display = 'none';
	}

})();

let animationContainer = document.getElementById('animation-container');
for (var i = 0; i < 19; i++) {
	animationContainer.innerHTML += `
	<div class="game__fireflies game__fireflies--after"></div>`;

}