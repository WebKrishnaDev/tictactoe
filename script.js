// Audio files for game sounds
const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const tieSound = new Audio('tie.mp3');

// Initialize game state
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

// Get all cells and message element
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Function to play click sound
function playClickSound() {
    clickSound.play();
}

// Function to play win sound
function playWinSound() {
    winSound.play();
}

// Function to play tie sound
function playTieSound() {
    tieSound.play();
}

// Function to handle cell clicks
function handleClick(event) {
    const index = event.target.dataset.index;

    // If the cell is already filled or the game is not active, return early
    if (board[index] || !gameActive) return;

    // Update board and cell content
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    playClickSound();

    // Check for win or tie
    const winner = checkWin();
    if (winner) {
        gameActive = false;
        if (winner === 'Tie') {
            playTieSound();
            message.textContent = 'It\'s a Tie!';
        } else {
            playWinSound();
            message.textContent = `${winner} Wins!`;
        }
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a win or tie
function checkWin() {
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check for a win
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    // Check for a tie
    if (board.every(cell => cell)) {
        return 'Tie';
    }

    return null;
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = "Player X's turn";
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Reset button functionality
document.querySelector('button').addEventListener('click', resetGame);
