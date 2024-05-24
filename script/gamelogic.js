// Checks Game status
export const scoreMate = grid => {
    if (linecheck(grid, 1))
        return 1; // Player 1 wins
    if (linecheck(grid, 0))
        return 0; // Player 0 wins

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i][j] == -1)
                return -1; // Game ongoing

    return 2; // Draw
}

// Flag every line for each player
const linecheck = (grid, x) => {
    let diagLR = true;
    let diagRL = true;

    for (let i = 0; i < 3; i++) {
        let hori = true;
        let verti = true;

        for (let j = 0; j < 3; j++) {
            if (grid[i][j] != x)
                hori = false;

            if (grid[j][i] != x)
                verti = false;
        }

        if (hori || verti)
            return true;

        if (grid[i][i] != x)
            diagLR = false;

        if (grid[i][2 - i] != x)
            diagRL = false;
    }

    return diagLR || diagRL;
}
