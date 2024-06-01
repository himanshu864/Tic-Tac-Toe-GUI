const tiles = document.querySelectorAll(".tile");

// Computer Clicks
export const algoPlayerTwo = (grid) => {
    // Random
    let ok = [];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i][j] == -1)
                ok.push(3 * i + j);

    let r = Math.floor(Math.random() * (ok.length - 1))
    tiles[ok[r]].click();
}
