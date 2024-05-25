#include <iostream>
#include <vector>
#include <limits>
#include <cmath>
using namespace std;

vector<vector<int>> grid = {{-1, -1, -1}, {-1, -1, -1}, {-1, -1, -1}};
bool gameOver = false;

void printGrid()
{
    cout << "  0   1   2 " << endl;
    for (int i = 0; i < 3; i++)
    {
        cout << " +---+---+---+" << endl;
        cout << i;
        for (int j = 0; j < 3; j++)
            cout << "| " << (grid[i][j] == -1 ? ' ' : (grid[i][j] == 1 ? 'X' : 'O')) << " ";
        cout << "|" << endl;
    }
    cout << " +---+---+---+" << endl;
    cout << endl;
}

// Only for Player One;
void inputPlayerOne()
{
    int row, col;
    bool validInput = false;

    while (!validInput)
    {
        printGrid();

        cout << "Enter row (0-2): ";
        while (!(cin >> row) || row < 0 || row > 2)
        {
            cout << "> Incorrect Input, Try again! Enter row (0-2): ";
            cin.clear();                                         // Clear the error flag on cin
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Ignore the incorrect input
        }

        cout << "Enter col (0-2): ";
        while (!(cin >> col) || col < 0 || col > 2)
        {
            cout << "> Incorrect Input, Try again! Enter col (0-2): ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }

        if (grid[row][col] != -1)
            cout << "> Already Taken, Try again!" << endl;
        else
        {
            grid[row][col] = 1;
            validInput = true;
        }
    }
}

// Flag every line for each player
bool linecheck(int x)
{
    bool diagLR = true, diagRL = true;
    for (int i = 0; i < 3; i++)
    {
        bool hori = true, verti = true;

        for (int j = 0; j < 3; j++)
        {
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

int scoreMate()
{
    if (linecheck(1))
        return 1; // Player 1 wins
    if (linecheck(0))
        return 0; // Player 0 wins

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (grid[i][j] == -1)
                return -1; // Game ongoing

    return 2; // Draw
}

bool areYouWinningSon()
{
    int result = scoreMate();

    if (result != -1)
    {
        printGrid();
        if (result == 1)
            cout << "You win, Player One!" << endl;
        if (result == 0)
            cout << "You win, Player Two!" << endl;
        if (result == 2)
            cout << "It's a Draw!" << endl;
        return true;
    }
    return false;
    cout << endl;
}

// Check if there's a winning or blocking move and execute it
bool instantKill(int x)
{
    for (int i = 0; i < 3; i++)
    {
        // Check rows
        if (grid[i][0] == x && grid[i][1] == x && grid[i][2] == -1)
        {
            grid[i][2] = 0;
            return true;
        }
        if (grid[i][0] == x && grid[i][2] == x && grid[i][1] == -1)
        {
            grid[i][1] = 0;
            return true;
        }
        if (grid[i][1] == x && grid[i][2] == x && grid[i][0] == -1)
        {
            grid[i][0] = 0;
            return true;
        }

        // Check columns
        if (grid[0][i] == x && grid[1][i] == x && grid[2][i] == -1)
        {
            grid[2][i] = 0;
            return true;
        }
        if (grid[0][i] == x && grid[2][i] == x && grid[1][i] == -1)
        {
            grid[1][i] = 0;
            return true;
        }
        if (grid[1][i] == x && grid[2][i] == x && grid[0][i] == -1)
        {
            grid[0][i] = 0;
            return true;
        }
    }

    // Check diagonals
    if (grid[0][0] == x && grid[1][1] == x && grid[2][2] == -1)
    {
        grid[2][2] = 0;
        return true;
    }
    if (grid[0][0] == x && grid[2][2] == x && grid[1][1] == -1)
    {
        grid[1][1] = 0;
        return true;
    }
    if (grid[1][1] == x && grid[2][2] == x && grid[0][0] == -1)
    {
        grid[0][0] = 0;
        return true;
    }

    if (grid[0][2] == x && grid[1][1] == x && grid[2][0] == -1)
    {
        grid[2][0] = 0;
        return true;
    }
    if (grid[0][2] == x && grid[2][0] == x && grid[1][1] == -1)
    {
        grid[1][1] = 0;
        return true;
    }
    if (grid[1][1] == x && grid[2][0] == x && grid[0][2] == -1)
    {
        grid[0][2] = 0;
        return true;
    }

    return false;
}

void algoPlayerTwo()
{
    // If instant win, take it
    if (instantKill(0))
        return;

    // If instant lose, prevent it
    if (instantKill(1))
        return;

    // Else Random
    cout << "Random" << endl;
    vector<pair<int, int>> ok;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (grid[i][j] == -1)
                ok.push_back({i, j});

    int r = rand() % ok.size();
    grid[ok[r].first][ok[r].second] = 0;
}

int main()
{
    srand(time(0)); // Seed the random number generator

    while (true)
    {
        inputPlayerOne();
        if (areYouWinningSon())
            break;

        algoPlayerTwo();
        if (areYouWinningSon())
            break;
    }
    return 0;
}
