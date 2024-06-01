const tiles = document.querySelectorAll(".tile");

// Check if there's a winning move and execute it
const checkWin = (grid, player) => {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (grid[i][0] === player && grid[i][1] === player && grid[i][2] === -1) return 3 * i + 2;
        if (grid[i][0] === player && grid[i][2] === player && grid[i][1] === -1) return 3 * i + 1;
        if (grid[i][1] === player && grid[i][2] === player && grid[i][0] === -1) return 3 * i;

        // Check columns
        if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === -1) return 6 + i;
        if (grid[0][i] === player && grid[2][i] === player && grid[1][i] === -1) return 3 + i;
        if (grid[1][i] === player && grid[2][i] === player && grid[0][i] === -1) return i;
    }

    // Check diagonals
    if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === -1) return 8;
    if (grid[0][0] === player && grid[2][2] === player && grid[1][1] === -1) return 4;
    if (grid[1][1] === player && grid[2][2] === player && grid[0][0] === -1) return 0;
    if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === -1) return 6;
    if (grid[0][2] === player && grid[2][0] === player && grid[1][1] === -1) return 4;
    if (grid[1][1] === player && grid[2][0] === player && grid[0][2] === -1) return 2;

    return -1;
}

const minimax = (grid, depth, isMaximizing) => {
    let score = evaluate(grid);
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!isMovesLeft(grid)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === -1) {
                    grid[i][j] = 0;
                    best = Math.max(best, minimax(grid, depth + 1, false));
                    grid[i][j] = -1;
                }
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === -1) {
                    grid[i][j] = 1;
                    best = Math.min(best, minimax(grid, depth + 1, true));
                    grid[i][j] = -1;
                }
            }
        }
        return best;
    }
}

const findBestMove = (grid) => {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === -1) {
                grid[i][j] = 0;
                let moveVal = minimax(grid, 0, false);
                grid[i][j] = -1;
                if (moveVal > bestVal) {
                    bestMove = 3 * i + j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}

const isMovesLeft = (grid) => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i][j] === -1)
                return true;
    return false;
}

const evaluate = (grid) => {
    for (let i = 0; i < 3; i++) {
        if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
            if (grid[i][0] === 0) return 10;
            if (grid[i][0] === 1) return -10;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
            if (grid[0][i] === 0) return 10;
            if (grid[0][i] === 1) return -10;
        }
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        if (grid[0][0] === 0) return 10;
        if (grid[0][0] === 1) return -10;
    }

    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        if (grid[0][2] === 0) return 10;
        if (grid[0][2] === 1) return -10;
    }

    return 0;
}

// Computer Clicks
export const algoPlayerTwo = (grid) => {
    // If instant win, take it
    let winMove = checkWin(grid, 0);
    if (winMove !== -1) {
        tiles[winMove].click();
        return;
    }

    // If instant lose, prevent it
    let blockMove = checkWin(grid, 1);
    if (blockMove !== -1) {
        tiles[blockMove].click();
        return;
    }

    // Else Minimax
    let bestMove = findBestMove(grid);
    tiles[bestMove].click();
}
