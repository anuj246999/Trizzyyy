// ==========================
// ELEMENTS
// ==========================
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartbtn");

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startBtn = document.getElementById("startGame");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");
const winJokes = [
  "Aaj toh kheer khayegi fir😝",
  "W gng",
  "Not Bad for a nerd like you🤓",
  "Utni bevkuf nahi hai jitna socha tha.Great win anyways",
  "Yahan bhi jeet gayi",
  "Ab to aadat pad gayi hogi jeetne ki😭",
  "You won because i let you(I am coping hard)",
  "Jyada achha khelegi, Jyada achha khelegi😡",
  "WHATEVER",
  "Kohni maardeti harane se achha"
];
function getRandomJoke(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const drawJokes = [
  "Barabar dumb hain",
  "Proves why we are so similar 😭",
  "I would rather have a draw than let you win",
  "Barabar braincells hai apne💔💔💔",
  "Agar ye Draw nahi hota to mai hi jeet ta its obvious we both know it",
  "WHATEVER"
];


// ==========================
// GAME DATA
// ==========================
const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let player1Name = "Player 1";
let player2Name = "Player 2";

let player1Symbol = "X";
let player2Symbol = "O";

let currentPlayer = "";
let running = false;
let emojiLocked = false;
let gameStarted = false; // full session started or not


// ==========================
// INIT
// ==========================
function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${player1Name}'s turn`;
  running = true;
}

// ==========================
// CELL CLICK
// ==========================
function cellClicked() {
    if (!currentPlayer) return;

  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) return;

  updateCell(this, cellIndex);
  checkWinner();
}

// ==========================
// UPDATE CELL
// ==========================
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// ==========================
// PLAYER SWITCH
// ==========================
function changePlayer() {
  currentPlayer =
    currentPlayer === player1Symbol ? player2Symbol : player1Symbol;

  const currentName =
    currentPlayer === player1Symbol ? player1Name : player2Name;

  statusText.textContent = `${currentName}'s turn`;
}

// ==========================
// WIN CHECK
// ==========================
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (options[a] === "" || options[b] === "" || options[c] === "") continue;

    if (options[a] === options[b] && options[b] === options[c]) {
      roundWon = true;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      break;
    }
  }

  if (roundWon) {
    const winnerName =
      currentPlayer === player1Symbol ? player1Name : player2Name;

    popupText.textContent = `${winnerName} wins!!!!🏆🔥 \n${getRandomJoke(winJokes)}`;
    popup.classList.remove("hidden");
    running = false;
  }
  else if (!options.includes("")) {
   popupText.textContent = `DRAW 😐\n${getRandomJoke(drawJokes)}`;
  popup.classList.remove("hidden");
    running = false;
  }
  else {
    changePlayer();
  }
}

// ==========================
// RESTART
// ==========================
function restartGame() {
  running = true;
  currentPlayer = player1Symbol;

  options = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });

  // 🔒 emojis SHOULD STAY LOCKED if game already started
  if (gameStarted) {
    gameLocked = true;
  }

  statusText.textContent = `${player1Name}'s turn`;
}


// ==========================
// START GAME BUTTON
// ==========================
  const emojiButtons = document.querySelectorAll(".emoji-pair");

emojiButtons.forEach(btn => {
  btn.addEventListener("click", () => {
 if (emojiLocked) return; // 🔒 LOCKED → kuch nahi hoga
    // remove previous highlight
    emojiButtons.forEach(b => b.classList.remove("emoji-selected"));

    // add highlight
    btn.classList.add("emoji-selected");

    // set symbols
    player1Symbol = btn.dataset.p1;
    player2Symbol = btn.dataset.p2;

    currentPlayer = player1Symbol;
     statusText.textContent = `${player1Name}'s turn`;
  });
});

startBtn.addEventListener("click", () => {
  player1Name = player1Input.value || "Player 1";
  player2Name = player2Input.value || "Player 2";

  statusText.textContent = `${player1Name}'s turn`;
  document.querySelector(".player-setup").style.display = "none";

  gameLocked = true;      // emoji lock
  gameStarted = true;    // 🔥 IMPORTANT

  emojiButtons.forEach(btn =>
    btn.classList.add("emoji-disabled")
  );

  initializeGame();
});




// ==========================
// POPUP CLOSE
// ==========================
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});
const letterBtn = document.getElementById("letterBtn");
const letterPopup = document.getElementById("letterPopup");
const closeLetter = document.getElementById("closeLetter");

letterBtn.addEventListener("click", () => {
  letterPopup.classList.remove("hidden");
});

closeLetter.addEventListener("click", () => {
  letterPopup.classList.add("hidden");
});

