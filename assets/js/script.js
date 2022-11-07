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

// set timerCount for one minute
var timerCount = 60;
var correctAnswerArr = [];
var questionsIndex = 0;
var result = "";
var score = 0;

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

// start game loop
const gameLoop = function () {
  setInterval(timerCountdown, 1000);
  welcomeEl.remove();
  quizEl.style.display = "block";
  buildQuestionTemplate(questionsIndex);
};

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
var timePenalty = function () {
  timerCount -= 10;
};


const checkAnswer = function (event) {
  let answerChoice = event.target.value;
  let result;
  let index = questionsIndex;

  if (answerChoice === quizQuestions[index].correctAnswer) {
    result = true;
  } else {
    result = false;
  }

  if (result === false) {
    timePenalty();
    alert("Wrong");
  } else {
    alert("correct!!");
  }

  questionsIndex++;
  buildQuestionTemplate(questionsIndex);
};

startQuiz.addEventListener("click", gameLoop);
choiceOneEl.addEventListener("click", checkAnswer);
choiceTwoEl.addEventListener("click", checkAnswer);
choiceThreeEl.addEventListener("click", checkAnswer);
choiceFourEl.addEventListener("click", checkAnswer);

// decrements timerCount by the second until time is up
var timerCountdown = function () {
  startTimer.textContent = timerCount;

  // remove welcome message/instructions

  if (timerCount === 0) {
    clearInterval(startCountdown);
    startTimer.textContent = "Time's Up!!";
  }
  timerCount--;
};

// var getAnswer = function (choice) {
//   var chosenAnswer = choice;
//   var index = questionsIndex;
//   var answer = quizQuestions[index].correctAnswer;
//   console.log(chosenAnswer);
//   console.log(answer);
//   if (chosenAnswer === "") {
//     return;
//   } else if (chosenAnswer !== answer) {
//     console.log("false");
//   } else {
//     console.log("true");
//   }

// };

