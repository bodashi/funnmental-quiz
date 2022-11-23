// initialize html elements
var startQuiz = document.querySelector("#start-quiz");
var startTimer = document.querySelector("#quizTimer");
var welcomeEl = document.querySelector("#welcome");
var quizEl = document.querySelector("#quiz");
var questionTitleEl = document.querySelector("#question-title");
var choiceOneEl = document.querySelector("#choice-one");
var choiceTwoEl = document.querySelector("#choice-two");
var choiceThreeEl = document.querySelector("#choice-three");
var choiceFourEl = document.querySelector("#choice-four");
var endGameEl = document.querySelector("#end-game");
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initial");
var submitScoreEl = document.querySelector("#submit-score");
var highscoreEl = document.querySelector("#highscore");
var quizBannerEl = document.querySelector("#quiz-banner");

// initialize quiz variables
var timerCount = 60;
var questionsIndex = 0;
var result = "";
var score = 0;
var timeLeft = 0;
var highscores = [];

// array of JS questions
var quizQuestions = [
  {
    question: "Which of these does not declare a variable?",
    answerChoices: ["let", "const", "var", "//"],
    correctAnswer: "//",
  },
  {
    question: "JavaScript is a(n) ______ language.",
    answerChoices: ["Object-Oriented", "Functional", "Coffee", "Java"],
    correctAnswer: "Object-Oriented",
  },
  {
    question:
      "When an operator's value is NULL, the typeof returned by the unary operator is:",
    answerChoices: ["Boolean", "Undefined", "Object", "Integer"],
    correctAnswer: "Object",
  },
  {
    question: 'What does the Javascript "debugger" statement do?',
    answerChoices: [
      "It will debug all the errors in the program at runtime.",
      "It acts as a breakpoint in a program.",
      "It will debug error in the current statement if any.",
      "All of the above.",
    ],
    correctAnswer: "It acts as a breakpoint in a program.",
  },
];

// start quiz loop
const startGame = function () {
  setInterval(timerCountdown, 1000);
  welcomeEl.remove();
  quizEl.style.display = "block";
  buildQuestionTemplate(questionsIndex);
};

// decrements timerCount by the second until time is up
var timerCountdown = function () {
  startTimer.textContent = timerCount;
  if (timerCount === 0) {
    clearInterval(timerCountdown);
    startTimer.textContent = "Time's Up!!";
  } else if (questionsIndex >= quizQuestions.length) {
    startTimer.textContent = "Done!";
    clearInterval(timerCountdown);
  }
  timerCount--;
};

// Give html elements the quiz array values
const buildQuestionTemplate = function (questionsIndex) {
  let index = questionsIndex;
  let choiceOne, choiceTwo, choiceThree, choiceFour;
  questionTitleEl.textContent = quizQuestions[index].question;

  for (let i = 0; i < quizQuestions[index].answerChoices.length; i++) {
    let choice = quizQuestions[index].answerChoices[i];
    switch (i) {
      case 0:
        choiceOne = choice;
        break;
      case 1:
        choiceTwo = choice;
        break;
      case 2:
        choiceThree = choice;
        break;
      case 3:
        choiceFour = choice;
        break;
      default:
        break;
    }
  }
  choiceOneEl.value = choiceOne;
  choiceTwoEl.value = choiceTwo;
  choiceThreeEl.value = choiceThree;
  choiceFourEl.value = choiceFour;
};

// award ten points to player for correct answer
var correctAward = function () {
  score += 10;
};

// deduct ten points for incorrect answer
var timePenalty = function () {
  timerCount -= 10;
};

// pass player choice to checkResult
const checkAnswer = function (event) {
  let answerChoice = event.target.value;
  checkResult(answerChoice);
};

// If there's no more questions stores time,  otherwise next quiz question
const nextQuestion = function () {
  if (questionsIndex >= quizQuestions.length) {
    timeLeft = timerCount;
    console.log(timeLeft);
    clearInterval(timeLeft);
    startTimer.textContent = "Done!";
    displayScore(timeLeft);
  } else {
    buildQuestionTemplate(questionsIndex);
  }
};

// Display highscore form and player score
const displayScore = function (timeLeft) {
  let timeBonus = timeLeft;
  score += timeBonus;
  scoreEl.textContent = score;
  quizEl.style.display = "none";
  endGameEl.style.display = "block";
};

// loads highscore localStorage and passes values
const loadHighscores = function () {
  highscores = localStorage.getItem("highscore");
  if (!highscores) {
    return (highscores = []);
  }

  highscores = JSON.parse(highscores);
  return highscores;
};

// saves new player score in JSON to be stored in localStorage
const saveScore = function (event) {
  event.preventDefault();
  let player = { playerInitial: initialsEl.value, finalScore: score };
  highscores.push(player);
  localStorage.setItem("highscore", JSON.stringify(highscores));
  endGameEl.style.display = "none";
  quizBannerEl.style.display = "none";
  highscorePage();
};

// grab highscore array and display in descending order.
const highscorePage = function () {
  highscoreEl.style.display = "block";
  for (let i = 0; i < highscores.length; i++) {
    let highscoreListItem = document.createElement("li");

    highscoreListItem.textContent =
      highscores[i].playerInitial + ": " + highscores[i].finalScore;
    highscoreEl.appendChild(highscoreListItem);
  }
};

// validate player choice and notify player
const checkResult = function (answerChoice) {
  let choice = answerChoice;
  let result;
  let index = questionsIndex;

  if (choice === quizQuestions[index].correctAnswer) {
    result = true;
  } else {
    result = false;
  }

  if (result === false) {
    timePenalty();
    alert("Wrong");
  } else {
    correctAward();
    alert("correct!!");
    console.log(score);
  }
  questionsIndex++;
  nextQuestion();
};

startQuiz.addEventListener("click", startGame);
choiceOneEl.addEventListener("click", checkAnswer);
choiceTwoEl.addEventListener("click", checkAnswer);
choiceThreeEl.addEventListener("click", checkAnswer);
choiceFourEl.addEventListener("click", checkAnswer);
submitScoreEl.addEventListener("submit", saveScore);

loadHighscores();
