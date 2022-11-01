var startQuiz = document.querySelector("#start-quiz");
var startTimer = document.querySelector("#quizTimer");
var welcomeEl = document.querySelector("#welcome");
var questionEl = document.querySelector("#question-wrapper");

var timerCount = 5;

var quizQuestions = [
  {
    question: "Which of these does not declare a variable?",
    answers: ["let", "const", "var", "//"],
    correctAnswer: "//",
  },
  {
    question: "JavaScript is a(n) ______ language.",
    answers: ["Object-Oriented", "Functional", "Coffee", "Java"],
    correctAnswer: "Object-Oriented",
  },
  {
    question:
      "When an operator's value is NULL, the typeof returned by the unary operator is:",
    answers: ["Boolean", "Undefined", "Object", "Integer"],
    correctAnswer: "Object",
  },
  {
    question: 'What does the Javascript "debugger" statement do?',
    answers: [
      "It will debug all the errors in the program at runtime",
      "It acts as a breakpoint in a program",
      "It will debug error in the current statement if any.",
      "All of the above.",
    ],
    correctAnswer: "It acts as a breakpoint in a program.",
  },
];

var beginQuiz = function () {
  welcomeEl.remove();

  var timerCountdown = function () {
    startTimer.textContent = timerCount;

    if (timerCount === 0) {
      clearInterval(startCountdown);
      startTimer.textContent = "Time's Up!!";
    }
    timerCount--;
  };

  var displayQuestion = function () {
    // create element question wrapper
    var questionWrapper = document.createElement("section");
    var questionTitle = document.createElement("h2");
    var questionAnswersWrapper = document.createElement("div");

    var questionAnswersContainerOne = document.createElement("div");
    var questionAnswersContainerTwo = document.createElement("div");
    var questionAnswersContainerThree = document.createElement("div");
    var questionAnswersContainerFour = document.createElement("div");

    var questionAnswerOne = document.createElement("button");
    var questionAnswerTwo = document.createElement("button");
    var questionAnswerThree = document.createElement("button");
    var questionAnswerFour = document.createElement("button");

    questionWrapper.appendChild(questionTitle);
    questionWrapper.appendChild(questionAnswersWrapper);

    questionAnswersWrapper.appendChild(questionAnswersContainerOne);
    questionAnswersWrapper.appendChild(questionAnswersContainerTwo);
    questionAnswersWrapper.appendChild(questionAnswersContainerThree);
    questionAnswersWrapper.appendChild(questionAnswersContainerFour);

    questionAnswersContainerOne.appendChild(questionAnswerOne);
    questionAnswersContainerTwo.appendChild(questionAnswerTwo);
    questionAnswersContainerThree.appendChild(questionAnswerThree);
    questionAnswersContainerFour.appendChild(questionAnswerFour);

    questionEl.append(questionWrapper);



    for (var i = 0; i < quizQuestions.length; i++) {
      questionTitle.textContent = quizQuestions[i].question;
      questionAnswerOne.textContent = quizQuestions[i].answers[0];
      questionAnswerTwo.textContent = quizQuestions[i].answers[1];
      questionAnswerThree.textContent = quizQuestions[i].answers[2];
      questionAnswerFour.textContent = quizQuestions[i].answers[3];
    }
  };
  var startCountdown = setInterval(timerCountdown, 1000);
  displayQuestion();
};

startQuiz.addEventListener("click", beginQuiz);
