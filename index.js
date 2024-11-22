const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const cells = Array.from(document.querySelectorAll(".cell"));
const nameModal = document.getElementById("nameModal");
const gameContainer = document.getElementById("gameContainer");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const startGameButton = document.getElementById("startGame");

let currentPlayer = "X";
let playerXName = "Player X";
let playerOName = "Player O";
let gameActive = true;
let boardState = Array(9).fill(null);

function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] || !gameActive) {
        event.target.classList.add("taken");
        return;
    }
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
        message.textContent = `${currentPlayer === "X" ? playerXName : playerOName} wins!`;
        gameActive = false;
    } else if (boardState.every((cell) => cell)) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `${currentPlayer === "X" ? playerXName : playerOName}'s turn`;
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winningCombos.some((combo) =>
        combo.every((index) => boardState[index] === currentPlayer)
    );
}

function restartGame() {
    boardState.fill(null);
    gameActive = true;
    currentPlayer = "X";
    message.textContent = `${playerXName}'s turn`;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

function startGame() {
    playerXName = playerXInput.value || "Player X";
    playerOName = playerOInput.value || "Player O";
    nameModal.style.display = "none";
    gameContainer.style.display = "block";
    message.textContent = `${playerXName}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
startGameButton.addEventListener("click", startGame);
