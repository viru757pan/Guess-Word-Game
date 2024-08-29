const words = [
  "apple",
  "banana",
  "cherry",
  "orange",
  "grapes",
  "peach",
  "mango",
  "papaya",
  "kiwi",
  "strawberry",
  "blueberry",
  "pineapple",
  "watermelon",
  "coconut",
  "pomegranate",
  "raspberry",
  "apricot",
  "guava",
  "dragonfruit",
  "blackberry",
];
let selectedWord = words[Math.floor(Math.random() * words.length)]; // Select a random word
let attemptsLeft = 5;
let guessedWord = Array(selectedWord.length).fill("_"); // Create an array of underscores
let scrambledWord = shuffleWord(selectedWord.split("")); // Scramble the word
let usedGuesses = [];

const wordDisplay = document.getElementById("word-display");
const attemptsDisplay = document.getElementById("attempts");
const feedback = document.getElementById("feedback");

// Function to shuffle the word
function shuffleWord(wordArray) {
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  return wordArray;
}

document.getElementById("submit-btn").addEventListener("click", function () {
  const guess = document.getElementById("letter-input").value.toLowerCase();

  if (guess && !usedGuesses.includes(guess)) {
    usedGuesses.push(guess);

    if (guess === selectedWord) {
      guessedWord = selectedWord.split(""); // Set guessedWord to the full correct word
      feedback.textContent = "Congratulations! You guessed the word!";
    } else {
      attemptsLeft--;
      feedback.textContent = "Incorrect guess. Try again!";
    }

    updateDisplay();
    checkGameStatus();
  }

  document.getElementById("letter-input").value = ""; // Clear the input field
});

document.getElementById("pass-btn").addEventListener("click", function () {
  // Select a new word and reset the game state
  selectedWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = 5;
  guessedWord = Array(selectedWord.length).fill("_");
  scrambledWord = shuffleWord(selectedWord.split(""));
  usedGuesses = [];
  feedback.textContent = ""; // Clear the feedback message
  updateDisplay();
});

document.getElementById("show-answer").addEventListener("click", function () {
  feedback.textContent = `The word was: ${selectedWord}`;
});

// Function to update the display elements
function updateDisplay() {
  // Display the scrambled word with guessed letters revealed
  let displayString = scrambledWord
    .map((char, index) =>
      guessedWord[index] !== "_" ? guessedWord[index] : char
    )
    .join(" ");
  wordDisplay.textContent = displayString;
  attemptsDisplay.textContent = attemptsLeft; // Update the number of remaining attempts
}

// Function to check the game status (win/lose)
function checkGameStatus() {
  if (guessedWord.join("") === selectedWord) {
    feedback.textContent = "Congratulations! You guessed the word!";
  } else if (attemptsLeft <= 0) {
    feedback.textContent = `Game Over! The word was: ${selectedWord}`;
  } else {
    feedback.textContent = ""; // Clear feedback if the game is still ongoing
  }
}

// Initialize the game display when the page loads
updateDisplay();
