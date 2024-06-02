const tiles = document.querySelectorAll(".tile");

let combination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function availableMoves(grid) {
    let moves = [];
    for (let i = 0; i < 9; i++)
        if (grid[Math.floor(i / 3)][i % 3] == -1)
            moves.push(i);
    return moves;
}

function winCheck(grid) {
    for (const line of combination) {
        if (line.every(index => grid[Math.floor(index / 3)][index % 3] === 0))
            return 1; // Computer wins
        if (line.every(index => grid[Math.floor(index / 3)][index % 3] === 1))
            return -1; // Player wins
    }
    if (availableMoves(grid).length === 0)
        return 0; // draw
    return 2; // continue
}

// Heart of the algorithm : Backtracking Tree of future outcomes
// Minimize loss and Maximize Vistory!
// Calc all possible outcomes and allote them utility accordingly

// Utility = (remaining tiles + 1) * sign;
// sign : +ve for computer win, -ve for cp lose, 0 for draw
// We assume Player will move their best move, hence minimize score
// While we maximize our score.
function minMax(grid, player) {
    let moves = availableMoves(grid);
    let sign = winCheck(grid);

    if (sign != 2) {
        return (moves.length + 1) * sign;
    }

    // set initial score = -Infinity for computer to beat it
    let bestScore = (player ? Infinity : -Infinity);

    for (const move of moves) {
        // make move
        grid[Math.floor(move / 3)][move % 3] = player;
        // Recursively call minMax and determine the score
        const currScore = minMax(grid, player ? 0 : 1);
        // backtrack
        grid[Math.floor(move / 3)][move % 3] = -1;

        // make current player choose best score for himself
        if (player) bestScore = Math.min(bestScore, currScore);
        else bestScore = Math.max(bestScore, currScore);
    }
    return bestScore;
}

// AI function to make best possible move
export function algoPlayerTwo(grid) {
    let bestMove = null;
    let bestScore = -100;
    let moves = availableMoves(grid);

    // checks which move has best score for computer
    for (const move of moves) {
        grid[Math.floor(move / 3)][move % 3] = 0;
        const score = minMax(grid, 1);
        grid[Math.floor(move / 3)][move % 3] = -1;

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    // and click!
    if (bestMove != null)
        tiles[bestMove].click();
}
