(function getLocalStorageItems() {
	var playerWinner = localStorage.getItem('PlayerWinner');
	var tokenWinner1 = JSON.parse(localStorage.getItem('TokenWinner1'));
	var tokenWinner2 = JSON.parse(localStorage.getItem('TokenWinner2'));
	document.getElementById('get-winner-token-1').src = tokenWinner1;
	document.getElementById('get-winner-token-2').src = tokenWinner2;
	document.getElementById('playerWinner').innerHTML = playerWinner;
	var tokenWinnerToggle1 = document.querySelector('.status__token--toggle-1');
	var tokenWinnerToggle2 = document.querySelector('.status__token--toggle-2');

	localStorage.clear();

	if (tokenWinner1) {
		tokenWinnerToggle2.style.display = 'none';
	} else if (tokenWinner2) {
		tokenWinnerToggle1.style.display = 'none';
	}
})();

const animationContainer = document.getElementById('animation-container');

// Fireflies created with template literals in a for loop
for (var i = 0; i < 15; i++) {
	animationContainer.innerHTML += `
	<div class="fireflies fireflies--after"></div>`;
}

//Positioning fireflies randomly
const fireflies = document.querySelectorAll('.fireflies');
const width = animationContainer.offsetWidth;
const height = animationContainer.offsetHeight;

fireflies.forEach(function (firefly) {
	firefly.style.top = Math.round(Math.random(300) * height) + 'px';
	firefly.style.left = Math.round(Math.random(500) * width) + 'px';
});
