const WORDS = ["APPLE", "GRAPE", "STONE", "PLANT", "ROBOT", "WATER", "BRICK", "LIGHT", "SWEET", "WORLD"];

const MAX_TRIES = 6;
const WORD_LENGTH = 5;

const grid = document.getElementById("grid");
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let secret = pickWord();
let turn = 0;
let finished = false;

buildGrid();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (finished) return;

  const guess = input.value.trim().toUpperCase();
  if (!/^[A-Z]{5}$/.test(guess)) {
    setStatus("Use exactly 5 letters.");
    return;
  }

  playGuess(guess);
  input.value = "";
  input.focus();
});

resetBtn.addEventListener("click", () => {
  secret = pickWord();
  turn = 0;
  finished = false;
  grid.innerHTML = "";
  buildGrid();
  setStatus("New game started.");
  input.value = "";
  input.focus();
});

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function buildGrid() {
  for (let r = 0; r < MAX_TRIES; r += 1) {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.row = String(r);

    for (let c = 0; c < WORD_LENGTH; c += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }

    grid.appendChild(row);
  }
}

function playGuess(guess) {
  if (turn >= MAX_TRIES) return;

  const row = grid.querySelector(`[data-row="${turn}"]`);
  const cells = row.children;
  const marks = evaluateGuess(guess, secret);

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    cells[i].textContent = guess[i];
    cells[i].classList.add(marks[i]);
  }

  if (guess === secret) {
    finished = true;
    setStatus("You win!");
    return;
  }

  turn += 1;
  if (turn >= MAX_TRIES) {
    finished = true;
    setStatus(`Game over. Word: ${secret}`);
  } else {
    setStatus(`${MAX_TRIES - turn} tries left.`);
  }
}

function evaluateGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill("absent");
  const answerChars = answer.split("");

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guess[i] === answerChars[i]) {
      result[i] = "correct";
      answerChars[i] = "*";
    }
  }

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (result[i] !== "absent") continue;
    const idx = answerChars.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      answerChars[idx] = "*";
    }
  }

  return result;
}

function setStatus(text) {
  statusEl.textContent = text;
}
