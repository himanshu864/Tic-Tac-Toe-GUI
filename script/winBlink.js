const tiles = document.querySelectorAll(".tile");

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
        if (hori) {
            blinking(0, i);
            return true;
        }
        if (verti) {
            blinking(1, i);
            return true;
        }

        if (grid[i][i] != x)
            diagLR = false;

        if (grid[i][2 - i] != x)
            diagRL = false;
    }
    if (diagLR) {
        blinking(2, 0);
        return true;
    }
    if (diagRL) {
        blinking(2, 1);
        return true;
    }
    return false;
}

// Blink winning line and else grey
const blinking = (x, y) => {
    let skip = [];
    if (x == 0) {
        if (y == 0)
            skip = [0, 1, 2];
        else if (y == 1)
            skip = [3, 4, 5];
        else
            skip = [6, 7, 8];
    }
    else if (x == 1) {
        if (y == 0)
            skip = [0, 3, 6];
        if (y == 1)
            skip = [1, 4, 7];
        if (y == 2)
            skip = [2, 5, 8];
    }
    else {
        if (y == 0)
            skip = [0, 4, 8];
        else
            skip = [2, 4, 6];
    }

    for (let i = 0; i < 9; i++) {
        if (i == skip[0] || i == skip[1] || i == skip[2])
            tiles[i].classList.add("blink");
        else
            tiles[i].classList.add("focusOut");
    }
}