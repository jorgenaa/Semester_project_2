//Characters array

const gameCharacters = [{
		name: 'Eddard Stark',
		allegiance: 'House Stark',
		culture: 'Northmen',
		icon: 'graphics/icons/wolf.png',
		position: 'Lord of Winterfell',
		strength: 'Skilled warrior'
	},
	{
		name: 'Brynden Tully',
		allegiance: 'House Tully',
		culture: 'Andal',
		icon: 'graphics/icons/food-chain.png',
		position: 'Knight & battle commander',
		strength: 'Defensive lord'
	},
	{
		name: 'Tywin Lannister',
		allegiance: 'House Lannister',
		culture: 'Andal',
		icon: 'graphics/icons/lion.png',
		position: 'Head of House Lannister',
		strength: 'Pragmatic & calculated warrior'
	},
	{
		name: 'Robert Baratheon',
		allegiance: 'House Baratheon',
		culture: 'Andal',
		icon: 'graphics/icons/stag_head.png',
		position: 'King of the Andals and the First Men',
		strength: 'Great warrior'
	},
	{
		name: 'Viserys Targaryen',
		allegiance: 'House Targaryen',
		culture: 'Valyrian',
		icon: 'graphics/icons/hydra.png',
		position: 'King of the Andals and the First',
		strength: 'Aggressive and immoral lord'
	},
	{
		name: 'Balon Greyjoy',
		allegiance: 'House Greyjoy',
		culture: 'Ironborn',
		icon: 'graphics/icons/giant-squid.png',
		position: 'King of the Iron Islands',
		strength: 'Hard, ambitious and ruthless lord'
	},
	{
		name: 'Loras Tyrell',
		allegiance: 'House Tyrell',
		culture: 'Andal',
		icon: 'graphics/icons/rose.png',
		position: 'Lord Commander of the Kingsguard',
		strength: 'Skilled knight'
	},
	{
		name: 'Robin Arryn',
		allegiance: 'House Arryn',
		culture: 'Andal',
		icon: 'graphics/icons/falcon-moon.png',
		position: 'Lord of the Eyrie',
		strength: 'Defensive lord'
	},
	{
		name: 'Walder Frey',
		allegiance: 'House Frey',
		culture: 'Andal',
		icon: 'graphics/icons/frey.png',
		position: 'Lord of the Crossing and head of House Frey',
		strength: 'Vice and brave lord'
	},
	{
		name: 'Doran Martell',
		allegiance: 'House Martell',
		culture: 'Dornishmen',
		icon: 'graphics/icons/sun-spear.png',
		position: 'Prince of Dorne and Lord of Sunspear',
		strength: 'Strategic abilities'
	}
];

// created cards with template literals in a for loop
let container = document.querySelector('.game__body');

for (let i = 0; i < gameCharacters.length; i++) {
	container.innerHTML += `<div class="col-10 col-md-6 col-lg-4 p-2">
							<div class="card game__card game__card--color p-2" data-name="${gameCharacters[i].name}" data-icon="${gameCharacters[i].icon}"> 
								<div class="game-body white-text">
									<img class="game__icon" src="${gameCharacters[i].icon}" >
									<p class="selected-player"></p>
									<table class="game__table">
										<tr>
											<th>Name:</th> 
											<td> ${gameCharacters[i].name}</td>
										</tr>
										<tr>
											<th>Allegiance:</th> 
											<td>${gameCharacters[i].allegiance}</td>
										</tr>
										<tr>
											<th>Culture:</th> 
											<td>${gameCharacters[i].culture}</td>
										</tr>
										<tr>
											<th>Position:</th> 
											<td>${gameCharacters[i].position}</td>
										</tr>
										<tr>
											<th>Strength:</th> 
											<td>${gameCharacters[i].strength}</td>
										</tr>
									</table>
									
								</div><!-- game-body -->
							</div><!-- game -->
						</div><!-- col -->
				`;
}

let cards = document.querySelectorAll('.game__card');
let player1 = null;
let player2 = null;

//Toggle & add content to localstorage function

cards.forEach(function(el) {
	el.addEventListener('click', activateCard, false);
});

function activateCard(event) {
	if (
		player1 &&
		player2 &&
		!this.classList.contains('game__card--active-player1') &&
		!this.classList.contains('game__card--active-player2')
	) {
		return;
	}

	const selectedPlayerOne = document.querySelector('.selected-player-one');
	const selectedPlayerTwo = document.querySelector('.selected-player-two');
	const selectedPlayer = this.querySelector('.selected-player');


	if (player1 === null && !this.classList.contains('game__card--active-player2')) {
		player1 = this.dataset.name;
		player1 = this.dataset.icon;
		this.classList.add('game__card--active-player1');
		this.classList.add('selected-player--active');
		selectedPlayer.innerHTML = 'This is player 1';
		selectedPlayerOne.innerHTML = this.dataset.name;
		localStorage.setItem('Player1', this.dataset.name);
		localStorage.setItem('Player1Token', JSON.stringify(this.dataset.icon));
	} else {
		if (this.classList.contains('game__card--active-player1')) {
			player1 = null;
			this.classList.remove('game__card--active-player1');
			this.classList.remove('selected-player--active');
			selectedPlayer.innerHTML = '';
			selectedPlayerOne.innerHTML = '';
			localStorage.removeItem('Player1');
			localStorage.removeItem('Player1Token');
		} else {
			if (this.classList.contains('game__card--active-player2')) {
				player2 = null;
				this.classList.remove('game__card--active-player2');
				this.classList.remove('selected-player--active');
				selectedPlayer.innerHTML = '';
				selectedPlayerTwo.innerHTML = '';
				localStorage.removeItem('Player2');
				localStorage.removeItem('Player2Token');
			} else {
				player2 = this.dataset.name;
				player2 = this.dataset.icon;
				this.classList.add('game__card--active-player2');
				this.classList.add('selected-player--active');
				selectedPlayer.innerHTML = 'This is player 2';
				selectedPlayerTwo.innerHTML = this.dataset.name;
				localStorage.setItem('Player2', this.dataset.name);
				localStorage.setItem('Player2Token', JSON.stringify(this.dataset.icon));
			}
		}
	}

	toggleContinueButton();

	event.stopPropagation();
}

//Continue game function

let continueButton = document.getElementById('continue');
continueButton.addEventListener('click', toggleContinueButton);

function toggleContinueButton() {
	if (player1 !== null && player2 !== null) {
		continueButton.disabled = false;
		continueButton.classList.remove('game__btn--continue');
	} else {
		continueButton.disabled = true;
		continueButton.classList.add('game__btn--continue');
	}
}