//DOM elements

const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "developer"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
  wordElement.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
          )
          .join("")}
    `;

  const innerWord = wordElement.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersElement() {
  //display wrong letters
  wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

  //display body parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost.";
    popup.style.display = "flex";
  }
}

//show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press event listener
window.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

//restart game, play again event listener
playAgainButton.addEventListener("click", () => {
  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
});

displayWord();
