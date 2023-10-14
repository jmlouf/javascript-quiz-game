var body = document.body;

// Main menu elements
var mainMenuEl = document.createElement("main");
var h2MenuEl = document.createElement("h2");
var pMenuEl = document.createElement("p");
var playGameButtonEl = document.createElement("button");

// Main stats elements
var mainStatsEl = document.createElement("main");
var h2StatsEl = document.createElement("h2");
var pWinsStatsEl = document.createElement("p");
var pLossesStatsEl = document.createElement("p");
var divStatsEl = document.createElement("div");
var resetStatsButtonEl = document.createElement("button"); 

// Main game elements
var mainGameEl = document.createElement("main");
var h2GameEl = document.createElement("h2");
var pGameEl = document.createElement("p");
var divGameEl = document.createElement("div");
var choice1GameButtonEl = document.createElement("button");
var choice2GameButtonEl = document.createElement("button");
var choice3GameButtonEl = document.createElement("button");
var choice4GameButtonEl = document.createElement("button");
var divMessageEl = document.createElement("div");

// Timer elements
var divTimerEl = document.createElement("div");
var timerEl = document.createElement("p");

// Render main menu elements
h2MenuEl.textContent = "JavaScript Quiz Game";
pMenuEl.textContent = "Click the button to start a new game!";
playGameButtonEl.textContent = "Play";

// Render main stats elements
h2StatsEl.textContent = "Stats";
pWinsStatsEl.textContent = "Wins: 0";
pLossesStatsEl.textContent = "Losses: 0";
resetStatsButtonEl.textContent = "Reset";

// Append main menu elements
body.appendChild(mainMenuEl);
mainMenuEl.appendChild(h2MenuEl);
mainMenuEl.appendChild(pMenuEl);
mainMenuEl.appendChild(playGameButtonEl);

// Append main stats elements
body.appendChild(mainStatsEl);
mainStatsEl.appendChild(h2StatsEl);
mainStatsEl.appendChild(pWinsStatsEl);
mainStatsEl.appendChild(pLossesStatsEl);
mainStatsEl.appendChild(divStatsEl);
divStatsEl.appendChild(resetStatsButtonEl);

// Append main game elements
body.appendChild(mainGameEl);
mainGameEl.appendChild(h2GameEl);
mainGameEl.appendChild(pGameEl);
mainGameEl.appendChild(divGameEl);
divGameEl.appendChild(choice1GameButtonEl);
divGameEl.appendChild(choice2GameButtonEl);
divGameEl.appendChild(choice3GameButtonEl);
divGameEl.appendChild(choice4GameButtonEl);
mainGameEl.appendChild(divMessageEl);

// Append timer elements
mainGameEl.appendChild(divTimerEl);
divTimerEl.appendChild(timerEl);

// Set main menu elements attributes
mainMenuEl.setAttribute("class", "container-menu");
playGameButtonEl.setAttribute("class", "button");

// Set main stats elements attributes
mainStatsEl.setAttribute("class", "container-stats");
resetStatsButtonEl.setAttribute("class", "button");

// Set main game elements attributes
mainGameEl.setAttribute("class", "container-game");
divGameEl.setAttribute("class", "container-checkpoint");
choice1GameButtonEl.setAttribute("class", "button");
choice2GameButtonEl.setAttribute("class", "button");
choice3GameButtonEl.setAttribute("class", "button");
choice4GameButtonEl.setAttribute("class", "button");
divMessageEl.setAttribute("class", "answer-message");



// Global variables
var isWin;

var currentQuestion;
var index;

var timerInterval;
var secondsLeft;

var questions = [
  {
    question: "JavaScript is an ______ language.",
    choices: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    answer: "Object-Oriented",
  },

  {
    question: "Which of the following keywords are used to define a variable in JavaScript?",
    choices: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both A and B",
  },

  {
    question: "Which of the following methods is used to access HTML elements using JavaScript?",
    choices: ["getElementbyId()", "getElementsByClassName()", "Both A and B", "None of the above"],
    answer: "Both A and B",
  },

  {
    question: "Upon encountering empty statements, what does the JavaScript Interpreter do?",
    choices: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
    answer: "Ignores the statements",
  },

  {
    question: "Which of the following methods can be used to display data in some form using JavaScript?",
    choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
    answer: "All of the above",
  }
];



// Updates win count  and sets win count to user's local storage
function setWins() {

  pWinsStatsEl.textContent = winsCounter;
  localStorage.setItem("winsCount", winsCounter);

};



// Updates loss count  and sets loss count to user's local storage
function setLosses() {

  pLossesStatsEl.textContent = lossesCounter;
  localStorage.setItem("lossesCount", lossesCounter);

};



// Used by init() function
function getWins() {

  // If 
  var storedWins = localStorage.getItem("winsCount");

  if (storedWins == null) {
    winsCounter = 0;
  } else {
    winsCounter = storedWins;
  }

  var winsMessage = "Wins: " + winsCounter;

  pWinsStatsEl.textContent = winsMessage;

};



function getLosses() {

  var storedLosses = localStorage.getItem("lossesCount");

  if (storedLosses == null) {
    lossesCounter = 0;
  } else {
    lossesCounter = storedLosses;
  }

  var lossesMessage = "Losses: " + lossesCounter;

  pLossesStatsEl.textContent = lossesMessage;

};



function init() {

  // Initializes game with wins/losses via local storage
  getWins();
  getLosses();

};


function winGame() {
  endGameMessageEl.textContent = "You Win!";
  winsCounter++
  setWins();
};

function loseGame() {
  endGameMessageEl.textContent = "Game Over!";
  lossesCounter++
  setLosses();
};



function checkWin() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion(questionIndex);
  } else {
    var isWin = true;
  }

  return isWin;
};



// Gets question from index and renders it
function renderQuestion(index) {

  var currentQuestion = questions[index];

  // Renders question from index
  h2GameEl.textContent = questions[questionIndex].question;

  // Renders choices from index
  choice1GameButtonEl.textContent = questions[questionIndex].choices[0];
  choice2GameButtonEl.textContent = questions[questionIndex].choices[1];
  choice3GameButtonEl.textContent = questions[questionIndex].choices[2];
  choice4GameButtonEl.textContent = questions[questionIndex].choices[3];

  return currentQuestion;
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
    };

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      loseGame();
    }
  }, 1000);

  return timerInterval;
};



function checkAnswer(event) {

  var element = event.target;

  if (currentQuestion.answer == element.textContent) {
    divMessageEl.textContent = "Correct!";
    // Set win counter
  } else {
    divMessageEl.textContent = "Incorrect!";
    // Subtract 10 seconds from timer
    secondsLeft -= 10;
    // Set lose counter
  }

  checkWin();

  divMessageEl.setAttribute("style", "display:block");

  setTimeout(function() {
    divMessageEl.setAttribute("style", "display:none");
  }, 1000);

};



// Renders a random question and starts timer
function startGame() {

  mainMenuEl.setAttribute("style", "display:none");
  mainGameEl.setAttribute("style", "display:block");

  isWin = false;
  secondsLeft = 75;

  questionIndex = 0;

  currentQuestion = renderQuestion(questionIndex);
  setTimer();

};



function endGame () {

  mainGameEl.setAttribute("style", "display:none");
  mainMenuEl.setAttribute("style", "display:block");

  clearInterval(timerInterval);

};



playGameButtonEl.addEventListener("click", startGame);



// Calls the init() function when the page loads
init();



choice1GameButtonEl.addEventListener("click", checkAnswer);
choice2GameButtonEl.addEventListener("click", checkAnswer);
choice3GameButtonEl.addEventListener("click", checkAnswer);
choice4GameButtonEl.addEventListener("click", checkAnswer);
