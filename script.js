const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  // Clear winning line if exists
  const existingLine = document.querySelector(".winning-line");
  if (existingLine) existingLine.remove();
}

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winResult = checkWin();
  if (winResult) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    drawWinningLine(winResult);
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return condition; // return winning condition
    }
  }
  return null;
}

function drawWinningLine(indices) {
  const cells = document.querySelectorAll(".cell");
  const cell1 = cells[indices[0]].getBoundingClientRect();
  const cell3 = cells[indices[2]].getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  const x1 = cell1.left + cell1.width / 2;
  const y1 = cell1.top + cell1.height / 2;
  const x2 = cell3.left + cell3.width / 2;
  const y2 = cell3.top + cell3.height / 2;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  const line = document.createElement("div");
  line.classList.add("winning-line");
  line.style.width = `${length}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.left = `${x1 - boardRect.left}px`;
  line.style.top = `${y1 - boardRect.top}px`;

  board.appendChild(line);
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  createBoard();
}

createBoard();
