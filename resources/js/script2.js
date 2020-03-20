let tilesContainer = document.querySelector('.game-board__tiles-container');

for (let i = 1; i < 31; i++) {
	tilesContainer.innerHTML += `<div class="game-board__tile"><span class="game-board__number">${i}</span></div>`;
}



document.querySelector('#dice').addEventListener('click', rollDice);

function rollDice() {
	var dice = document.getElementById("dice");
	var d = Math.floor(Math.random() * 6) + 1;
	dice.innerHTML = d;

}


// You can create a board with css grid or flexbox,
//then give each square a number and when you roll
//the dice and add the new dice score to a running total,
//you could move a token to the square that has an id that matches the total score

// Jorgen02/25/2020
// and use math random to the dice
// from 1 - 6

// Connor O'Brien02/25/2020
// that's it
// you can use setTimeout to animate the dice, add a class, then remove it after a while

// Jorgen02/25/2020
// but I also need to make some traps to some of the tiles

// Connor O'Brien02/25/2020
// yip, you can have an array of numbers

// Jorgen02/25/2020
// push 3 back

// Connor O'Brien02/25/2020
// if the score matches one of those numbers it's a trap

// you can use localStorage to save the characters across the pages
// and use their names as classes on the board tokens
// remove spaces from the names if you do that
// or have an extra property in the object called slug or something like that