var player1Total = 0,
    player2Total = 0,
    playerTurn = 1;

//Fetching the localstorage content

function getLocalStorageItems() {
    let getPlayer1 = localStorage.getItem("Player1");
    let getPlayer2 = localStorage.getItem("Player2");
    let player1Token = JSON.parse(localStorage.getItem("Player1Token"));
    let player2Token = JSON.parse(localStorage.getItem("Player2Token"));
    document.getElementById("get-player1-token").src = player1Token;
    document.getElementById("get-player2-token").src = player2Token;
    document.querySelector(".get-player-1").innerHTML = getPlayer1;
    document.querySelector(".get-player-2").innerHTML = getPlayer2;

    let token1 = document.getElementById("token1");
    token1.src = player1Token;
    let token2 = document.getElementById("token2");
    token2.src = player2Token;
}
getLocalStorageItems();

//Tokens for the tiles

var token1Wrapper = document.getElementById("token1-wrapper");
var token2Wrapper = document.getElementById("token2-wrapper");
token1Wrapper.style.display = "none";
token2Wrapper.style.display = "none";

//Tiles for the board game

const totalTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

let tilesContainer = document.querySelector(".game__tiles-container");

totalTiles.forEach(function(number) {
    tilesContainer.innerHTML += `<div class="game__tile" id="${number}"><span class="game__number">${number}</span></div>`;
});



// Array of traps

const traps = [{
        enemyTrap1: "Pay tax penalty and go one step back"
    },
    {
        enemyTrap2: "You are starving. Go two steps back and find something to eat"
    },
    {
        enemyTrap3: "Deanerys’s Dragons have blocked the road ahead. Go three steps back"
    },
    {
        enemyTrap4: "Some local farmers are in great danger and need your help. Go four steps back"
    },
    {
        enemyTrap5: "A storm is coming. Go five steps back and take shelter"
    }
];


//Dice roll event function

document.querySelector("#dice").addEventListener("click", rollDice);

function rollDice() {
    var status = document.getElementById('status');
    var modal = document.querySelector('.game__modal');
    var diceResult = Math.floor(Math.random() * 6) + 1;
    var dice = document.querySelector(".game__dice");
    dice.style.display = "block";
    dice.src = "../resources/graphics/icons/dice-" + diceResult + ".png";
    dice.innerHTML = diceResult;

    let tile;
    var getPlayer1 = new getLocalStorageItems(getPlayer1);
    var getPlayer2 = new getLocalStorageItems(getPlayer2);
    // Token apperance condition
    if (playerTurn === 1) {
        player1Total = player1Total + diceResult;
        playerTurn = 2;
        token1Wrapper.style.display = "block";
        tile = document.getElementById(player1Total);
        tile.appendChild(token1Wrapper);

    } else if (playerTurn === 2) {
        player2Total = player2Total + diceResult;
        playerTurn = 1;
        token2Wrapper.style.display = "block";
        tile = document.getElementById(player2Total);
        tile.appendChild(token2Wrapper);
    }
    // Traps condition
    if (player1Total === totalTiles[4]) {
        status.innerHTML = traps[0].enemyTrap1;
        //player1Total = player1Total - 1;
    } else if (player2Total === totalTiles[4]) {
        status.innerHTML = traps[0].enemyTrap1;
        //player2Total = player1Total - 1;

    } else if (player1Total === totalTiles[7]) {
        status.innerHTML = traps[1].enemyTrap2;
        //player1Total = player1Total - 2;
        //traps[0].enemyTrap1 = "";
    } else if (player2Total === totalTiles[7]) {
        status.innerHTML = traps[1].enemyTrap2;
        //player2Total = player2Total - 2;
        //traps[0].enemyTrap1 = "";

    } else if (player1Total === totalTiles[16]) {
        status.innerHTML = traps[2].enemyTrap3;
        //player1Total = player1Total - 3;
        //traps[1].enemyTrap2 = "";
    } else if (player2Total === totalTiles[16]) {
        status.innerHTML = traps[2].enemyTrap3;
        //player2Total = player1Total - 3;
        //traps[1].enemyTrap2 = "";

    } else if (player1Total === totalTiles[21]) {
        status.innerHTML = traps[3].enemyTrap4;
        //player1Total = player1Total - 4;
        //traps[2].enemyTrap3 = "";
    } else if (player2Total === totalTiles[21]) {
        status.innerHTML = traps[3].enemyTrap4;
        //player2Total = player2Total - 4;
        //traps[2].enemyTrap3 = "";

    } else if (player1Total === totalTiles[25]) {
        status.innerHTML = traps[4].enemyTrap5;
        //player1Total = player1Total - 5;
        //traps[3].enemyTrap4 = "";
    } else if (player2Total === totalTiles[25]) {
        status.innerHTML = traps[4].enemyTrap5;
        //player2Total = player2Total - 5;
        //traps[3].enemyTrap4 = "";

    } else if (player1Total === totalTiles[29] || player2Total === totalTiles[29]) {
        modal.style.display = 'block';
        document.getElementById('token-winner').innerHTML = getPlayer1;
    } else {
        status.innerHTML = "";
    }



    console.log("player1Total", player1Total);
    console.log("player2Total", player2Total);
}