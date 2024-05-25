import { scoreMate } from "./gamelogic.js";
import { algoPlayerTwo } from "./computerlogic.js";

const button = document.getElementById("control-button");
const tiles = document.querySelectorAll(".tile");
const score = document.querySelector(".score");
const scoreP1 = document.getElementById("scoreP1");
const scoreP2 = document.getElementById("scoreP2");

let gameOver = false;
let playerOneTurn = true;
let p1 = 0;
let p2 = 0;
let grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

// Adds event listens to empty tiles
const startGame = () => {
    tiles.forEach(tile => {
        tile.addEventListener("click", handleClick, { once: true });
    })
}

const stopGame = () => {
    tiles.forEach(tile => {
        tile.removeEventListener("click", handleClick);
    });
}

// Start game by pressing button
const pressButtonRestart = () => {
    button.addEventListener("click", () => {
        button.classList.add("hide");
        score.classList.add("hide");
        // Reset everything on click
        grid = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];
        tiles.forEach(tile => {
            tile.innerText = "";
            tile.style.backgroundColor = "lavender";
            tile.classList.remove("focusOut");
            tile.classList.remove("blink");
        });
        playerOneTurn = true;
        gameOver = false;

        startGame();
    })
}

// Restart Logic
const restartButton = () => {
    button.innerText = "Play Again";
    button.classList.remove("hide");
    score.classList.remove("hide");
    pressButtonRestart();
}

// Modified grid based on player
const handleClick = async (e) => {
    const cell = e.target;
    const idx = Array.from(tiles).indexOf(cell);
    const row = Math.floor(idx / 3);
    const col = idx % 3;

    if (playerOneTurn) {
        cell.innerText = "X";
        grid[row][col] = 1;
    }
    else {
        cell.innerText = "O";
        grid[row][col] = 0;
    }
    cell.style.backgroundColor = "blueviolet";

    // Check if player Wins
    areYouWinningSon();

    playerOneTurn = !playerOneTurn;

    // If game not over and computer turn
    if (!gameOver && !playerOneTurn) {
        algoPlayerTwo(grid);
    }
}

// Logic for gameover
const areYouWinningSon = () => {
    const result = scoreMate(grid);

    if (result != -1) {
        if (result == 1) {
            score.innerText = "You Win!";
            p1++;
            scoreP1.innerText = p1;
        }
        if (result == 0) {
            score.innerText = "You Lose!";
            p2++;
            scoreP2.innerText = p2;
        }
        if (result == 2) {
            score.innerText = "It's a draw!";
        }

        gameOver = true;
        // removes tiles click event onces game over and adds button
        restartButton();
        stopGame();
    }
}

// START GAME
pressButtonRestart();
