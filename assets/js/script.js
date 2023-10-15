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
  },
];

var menuDisplayEl = document.getElementById("menu-display");
var quizDisplayEl = document.getElementById("quiz-display");
var resultsDisplayEl = document.getElementById("results-display");

var startButtonEl = document.getElementById("start-button");

var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var currentQuestionIndex = 0;
var answerMessageEl = document.getElementById("answer-message");

var timeLeftEl = document.getElementById("time-left");
var timerInterval;
var timeLeft;

var yourScoreEl = document.getElementById("your-score");
var finalScoreEl = document.getElementById("final-score");
var submitScoreButtonEl = document.getElementById("submit-score-button");
var yourScore;



function startGame() {

  menuDisplayEl.classList.add("hidden");
  quizDisplayEl.classList.remove("hidden");

  timeLeft = 75;
  yourScore = 0;

  getQuestion();
  getTimer();

};



function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];

  questionEl.textContent = currentQuestion.question;

  choicesEl.textContent = "";
  
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButtonEl = document.createElement("button");
    choiceButtonEl.textContent = currentQuestion.choices[i];
    choiceButtonEl.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceButtonEl);
  }

};



function getTimer() {

  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    if (timeLeft === 0) {
      loseGame();
    }
  }, 1000);

};



function checkAnswer(event) {

  var selected = event.target.textContent;
  var currentQuestion = questions[currentQuestionIndex];

  if (selected === currentQuestion.answer) {
    answerMessageEl.textContent = "Correct."
    yourScore += 10;
    yourScoreEl.textContent = yourScore;
  } else {
    answerMessageEl.textContent = "Incorrect."
    timeLeft -= 10;
  }

  answerMessageEl.classList.remove("hidden");

  setTimeout(function() {
    answerMessageEl.classList.add("hidden");
  }, 1500);

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    getQuestion();
  } else {
    checkWin();
  }

};



function checkWin() {

  if (timeLeft > 0) {
    clearInterval(timerInterval);
    winGame();
  } else {
    clearInterval(timerInterval);
    loseGame();
  }

};



function winGame() {

  quizDisplayEl.textContent = "You win.";

  getResults();

};



function loseGame() {

  quizDisplayEl.textContent = "You lose.";

  getResults();
  
};



function getResults() {

  resultsDisplayEl.classList.remove("hidden");

  var yourFinalScore = document.createElement("div");
  yourFinalScore.textContent = "Final Score: " + yourScore;
  finalScoreEl.appendChild(yourFinalScore);

};



startButtonEl.addEventListener("click", startGame);
