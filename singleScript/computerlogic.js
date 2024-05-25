const tiles = document.querySelectorAll(".tile");

// Check if there's a winning or blocking move and execute it
const instantKill = (grid, x) => {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (grid[i][0] == x && grid[i][1] == x && grid[i][2] == -1) {
            tiles[3 * i + 2].click();
            return true;
        }
        if (grid[i][0] == x && grid[i][2] == x && grid[i][1] == -1) {
            tiles[3 * i + 1].click();
            return true;
        }
        if (grid[i][1] == x && grid[i][2] == x && grid[i][0] == -1) {
            tiles[3 * i].click();
            return true;
        }

        // Check columns
        if (grid[0][i] == x && grid[1][i] == x && grid[2][i] == -1) {
            tiles[6 + i].click();
            return true;
        }
        if (grid[0][i] == x && grid[2][i] == x && grid[1][i] == -1) {
            tiles[3 + i].click();
            return true;
        }
        if (grid[1][i] == x && grid[2][i] == x && grid[0][i] == -1) {
            tiles[i].click();
            return true;
        }
    }

    // Check diagonals
    if (grid[0][0] == x && grid[1][1] == x && grid[2][2] == -1) {
        tiles[8].click();
        return true;
    }
    if (grid[0][0] == x && grid[2][2] == x && grid[1][1] == -1) {
        tiles[4].click();
        return true;
    }
    if (grid[1][1] == x && grid[2][2] == x && grid[0][0] == -1) {
        tiles[0].click();
        return true;
    }

    if (grid[0][2] == x && grid[1][1] == x && grid[2][0] == -1) {
        tiles[6].click();
        return true;
    }
    if (grid[0][2] == x && grid[2][0] == x && grid[1][1] == -1) {
        tiles[4].click();
        return true;
    }
    if (grid[1][1] == x && grid[2][0] == x && grid[0][2] == -1) {
        tiles[2].click();
        return true;
    }
    return false;
}

// Computer Clicks
export const algoPlayerTwo = (grid) => {
    // If instant win, take it
    if (instantKill(grid, 0))
        return;

    // If instant lose, prevent it
    if (instantKill(grid, 1))
        return;

    // Else Random
    let ok = [];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i][j] == -1)
                ok.push(3 * i + j);

    let r = Math.floor(Math.random() * (ok.length - 1))
    tiles[ok[r]].click();
}
