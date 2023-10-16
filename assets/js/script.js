// Question bank.
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
    question: "Which symbol is used to separate JavaScript statements?",
    choices: ["Comma (,)", "Colon (:)", "Hyphen (-)", "Semicolon (;)"],
    answer: "Semicolon (;)",
  },

  {
    question: "Which of the following methods can be used to display data in some form using JavaScript?",
    choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
    answer: "All of the above",
  },

  {
    question: "Which function is used to serialize an object into a JSON string in JavaScript?",
    choices: ["stringify()", "parse()", "convert()", "None of the above"],
    answer: "stringify()",
  },

  {
    question: "How do you stop an interval timer in JavaScript?",
    choices: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
    answer: "clearInterval",
  },

  {
    question: "How do you write a comment in JavaScript?",
    choices: ["/* */", "//", "#", "$ $"],
    answer: "//",
  },

  {
    question: "Which of the following tags is used to write JavaScript code?",
    choices: ["<script>", "<js>", "<javascript>", "java"],
    answer: "<script>",
  },

  {
    question: "Which event is related to the keyboard?",
    choices: ["onfocus", "onclick", "onkeydown", "onkeypress"],
    answer: "onkeydown",
  },
];

// Display elements.
var menuDisplayEl = document.getElementById("menu-display");
var quizDisplayEl = document.getElementById("quiz-display");
var quizContentDisplayEl = document.getElementById("quiz-content-display");
var winLoseDisplayEl = document.getElementById("win-lose-display");
var resultsDisplayEl = document.getElementById("results-display");
var lastScoreDisplayEl = document.getElementById("last-score-display");

// Start button.
var startButtonEl = document.getElementById("start-button");

// Quiz elements.
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var choiceButtonEl = document.getElementById("choice");
var answerMessageEl = document.getElementById("answer-message");
var currentQuestionIndex = 0;

// Timer elements.
var timeLeftEl = document.getElementById("time-left");
var timerInterval;
var timeLeft;

// Results elements.
var yourScoreEl = document.getElementById("your-score");
var finalScoreEl = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submitScoreButtonEl = document.getElementById("submit-score-button");

// Results variables.
var initials;
var yourScore;

// Start game function.
function startGame() {

  // Initialize the game.
  currentQuestionIndex = 0;
  
  timeLeftEl.textContent = "75";
  timeLeft = 75;

  yourScoreEl.textContent = "0";
  yourScore = 0;

  // Hide menu display; show quiz display and content.
  menuDisplayEl.classList.add("hidden");
  quizDisplayEl.classList.remove("hidden");
  quizContentDisplayEl.classList.remove("hidden");
  winLoseDisplayEl.classList.add("hidden");

  // Get question; start timer.
  getQuestion();
  getTimer();

};

// Get question.
function getQuestion() {

  // Create current question variable with index.
  var currentQuestion = questions[currentQuestionIndex];

  // Display question.
  questionEl.textContent = currentQuestion.question;

  // Reset choice buttons for each question.
  choicesEl.textContent = "";
  
  // For-loop to add each choice from array; add event listener to each button.
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButtonEl = document.createElement("button");
    choiceButtonEl.classList.add("choice-button");
    choiceButtonEl.textContent = currentQuestion.choices[i];
    choiceButtonEl.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceButtonEl);
  }

};

// Start timer.
function getTimer() {

  // Display time left.
  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    // Check if user won / lost based on time left.
    if (timeLeft <= 0) {
      checkWin();
    }

  }, 1000);

};

// Check if selected choice matches question answer.
function checkAnswer(event) {
  var selected = event.target.textContent;
  var currentQuestion = questions[currentQuestionIndex];

  if (selected === currentQuestion.answer) {

    // If selected choice matches, +10 points.
    answerMessageEl.textContent = "Correct"
    yourScore += 10;
    yourScoreEl.textContent = yourScore;

    // If selected choice doesn't match, -10 seconds.
  } else {
    answerMessageEl.textContent = "Incorrect"
    timeLeft -= 10;
  }

  // "Correct"/"Incorrect" message times out.
  answerMessageEl.classList.remove("hidden");

  setTimeout(function() {
    answerMessageEl.classList.add("hidden");
  }, 1500);

  // Display next question or check if user won.
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    getQuestion();
  } else {
    checkWin();
  }

};


// Check if user won or lost.
function checkWin() {

  if (timeLeft > 0) {
    clearInterval(timerInterval);
    winLoseDisplayEl.textContent = "You win.";
  } else {
    clearInterval(timerInterval);
    winLoseDisplayEl.textContent = "You lose.";
  }

  // Remove quiz content.
  winLoseDisplayEl.classList.remove("hidden");
  quizContentDisplayEl.classList.add("hidden");

  // Get results.
  getResults();

};

// Get results.
function getResults() {
  resultsDisplayEl.classList.remove("hidden");

  // Display final score.
  finalScoreEl.textContent = yourScore;

};

// Set final score and initials.
function saveScore() {
  var myFinalScore = {
    yourScore: yourScore,
    initials: initials.value.trim(),
  };

  // Store final score and initials.
  localStorage.setItem("myFinalScore", JSON.stringify(myFinalScore));
};

// Get final score and initials.
function renderLastFinalScore() {
  var lastFinalScore = JSON.parse(localStorage.getItem("myFinalScore"));

  if (lastFinalScore !== null) {
    document.getElementById("saved-last-initials").textContent = lastFinalScore.initials;
    document.getElementById("saved-last-final-score").textContent = lastFinalScore.yourScore;
  }

};


// Reset game.
function resetDisplay() {
  resultsDisplayEl.classList.add("hidden");
  menuDisplayEl.classList.remove("hidden");
  quizDisplayEl.classList.add("hidden");
  winLoseDisplayEl.classList.add("hidden");
};

// Submit score and initials event listener.
submitScoreButtonEl.addEventListener("click", function (event) {
  // Prevent input from disappearing.
  event.preventDefault();

  // Call functions with yourScore and initials as parameters.
  saveScore(yourScore, initials);
  renderLastFinalScore();

  // Call function to reset game.
  resetDisplay();
});

// Render last saved score and initials.
function init() {
  renderLastFinalScore();
};

// Call function to render last saved input.
init();

// Event listener to start game.
startButtonEl.addEventListener("click", startGame);
