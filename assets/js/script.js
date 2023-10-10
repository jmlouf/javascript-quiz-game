var body = document.body;

// Main menu elements
var mainMenuEl = document.createElement("main");
var h2MenuEl = document.createElement("h2");
var pMenuEl = document.createElement("p");
var playGameButtonEl = document.createElement("button");

// Main game elements
var mainGameEl = document.createElement("main");
var h2GameEl = document.createElement("h2");
var pGameEl = document.createElement("p");
var divGameEl = document.createElement("div");
var choice1GameButtonEl = document.createElement("button");
var choice2GameButtonEl = document.createElement("button");
var choice3GameButtonEl = document.createElement("button");
var choice4GameButtonEl = document.createElement("button");

// Timer elements
var divTimerEl = document.createElement("div");
var timerEl = document.createElement("p");

// Render main menu elements
h2MenuEl.textContent = "JavaScript Quiz Game";
pMenuEl.textContent = "Click the button to start a new game!";
playGameButtonEl.textContent = "Play";

// Append main menu elements
body.appendChild(mainMenuEl);
mainMenuEl.appendChild(h2MenuEl);
mainMenuEl.appendChild(pMenuEl);
mainMenuEl.appendChild(playGameButtonEl);

// Append main game elements
body.appendChild(mainGameEl);
mainGameEl.appendChild(h2GameEl);
mainGameEl.appendChild(pGameEl);
mainGameEl.appendChild(divGameEl);
divGameEl.appendChild(choice1GameButtonEl);
divGameEl.appendChild(choice2GameButtonEl);
divGameEl.appendChild(choice3GameButtonEl);
divGameEl.appendChild(choice4GameButtonEl);

// Append timer elements
mainGameEl.appendChild(divTimerEl);
divTimerEl.appendChild(timerEl);

// Set main menu elements attributes
mainMenuEl.setAttribute("class", "container-menu");
playGameButtonEl.setAttribute("class", "button");

// Set main game elements attributes
mainGameEl.setAttribute("class", "container-game");
choice1GameButtonEl.setAttribute("class", "button");
choice2GameButtonEl.setAttribute("class", "button");
choice3GameButtonEl.setAttribute("class", "button");
choice4GameButtonEl.setAttribute("class", "button");

var questions = {

  question1: {
    question: "Which of these is NOT an example of an HTML element?",
    choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
    answer: "<h1>",
  },

  question2: {
    question: "This is another of the following?",
    choices: ["answer1", "answer2", "answer3", "answer4"],
    answer: "answer3",
  },

  question3: {
    question: "Which of these is NOT an example of an HTML element?",
    choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
    answer: "<h1>",
  },

};



// Renders a random question and starts timer
function startGame() {
  
  mainMenuEl.setAttribute("style", "display:none");
  mainGameEl.setAttribute("style", "display:block");

  secondsLeft = 75;

  renderRandomQuestion();
  setTimer();

};



// Gets random question from object and renders it
function renderRandomQuestion() {

  // Gets random question from object
  var randomKey = Object.keys(questions)[Math.floor(Math.random() * Object.keys(questions).length)];
  var randomQuestion = questions[randomKey];

  // Renders random question
  h2GameEl.textContent = randomQuestion.question;
  choice1GameButtonEl.textContent = randomQuestion.choices[0];
  choice2GameButtonEl.textContent = randomQuestion.choices[1];
  choice3GameButtonEl.textContent = randomQuestion.choices[2];
  choice4GameButtonEl.textContent = randomQuestion.choices[3];

  return randomQuestion;

};



// Starts/stops timer and triggers win/lose game
function setTimer() {
  // Sets timer interval
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if (secondsLeft >= 0) {
      if (isWin && secondsLeft > 0) {
        clearInterval(timerInterval);
        winGame();
      }
    }

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      loseGame();
    }
  }, 1000);
};



playGameButtonEl.addEventListener("click", startGame);
