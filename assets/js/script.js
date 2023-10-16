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

var menuDisplayEl = document.getElementById("menu-display");
var quizDisplayEl = document.getElementById("quiz-display");
var quizContentDisplayEl = document.getElementById("quiz-content-display");
var winLoseDisplayEl = document.getElementById("win-lose-display");
var resultsDisplayEl = document.getElementById("results-display");
var lastScoreDisplayEl = document.getElementById("last-score-display");

var startButtonEl = document.getElementById("start-button");

var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var choiceButtonEl = document.getElementById("choice");
var answerMessageEl = document.getElementById("answer-message");
var currentQuestionIndex = 0;

var timeLeftEl = document.getElementById("time-left");
var timerInterval;
var timeLeft;

var yourScoreEl = document.getElementById("your-score");
var finalScoreEl = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submitScoreButtonEl = document.getElementById("submit-score-button");

var initials;
var yourScore;


function startGame() {
  currentQuestionIndex = 0;
  
  timeLeftEl.textContent = "75";
  timeLeft = 75;

  yourScoreEl.textContent = "0";
  yourScore = 0;

  menuDisplayEl.classList.add("hidden");
  quizDisplayEl.classList.remove("hidden");
  quizContentDisplayEl.classList.remove("hidden");
  winLoseDisplayEl.classList.add("hidden");

  getQuestion();
  getTimer();

};


function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  questionEl.textContent = currentQuestion.question;

  choicesEl.textContent = "";
  
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButtonEl = document.createElement("button");
    choiceButtonEl.classList.add("choice-button");
    choiceButtonEl.textContent = currentQuestion.choices[i];
    choiceButtonEl.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceButtonEl);
  }

};


function getTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      checkWin();
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
    winLoseDisplayEl.textContent = "You win.";
  } else {
    clearInterval(timerInterval);
    winLoseDisplayEl.textContent = "You lose.";
  }

  winLoseDisplayEl.classList.remove("hidden");
  quizContentDisplayEl.classList.add("hidden");

  getResults();

};


function getResults() {
  resultsDisplayEl.classList.remove("hidden");

  finalScoreEl.textContent = yourScore;

};


function saveScore() {
  var myFinalScore = {
    yourScore: yourScore,
    initials: initials.value.trim(),
  };

  localStorage.setItem("myFinalScore", JSON.stringify(myFinalScore));
};


function renderLastFinalScore() {
  var lastFinalScore = JSON.parse(localStorage.getItem("myFinalScore"));

  if (lastFinalScore !== null) {
    document.getElementById("saved-last-initials").textContent = lastFinalScore.initials;
    document.getElementById("saved-last-final-score").textContent = lastFinalScore.yourScore;
  }

};


function resetDisplay() {
  resultsDisplayEl.classList.add("hidden");
  menuDisplayEl.classList.remove("hidden");
  quizDisplayEl.classList.add("hidden");
  winLoseDisplayEl.classList.add("hidden");
};


submitScoreButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  saveScore(yourScore, initials);
  renderLastFinalScore();

  resetDisplay();
});


function init() {
  renderLastFinalScore();
};


init();


startButtonEl.addEventListener("click", startGame);
