var startQuiz = document.querySelector("#start-quiz");
var startTimer = document.querySelector("#quizTimer");
var welcomeEl = document.querySelector("#welcome");

var timerCount = 5;

var quizQuestions = [
  {
    question: "Which of these does not declare a variable?",
    answers: ["let", "const", "var", "//"],
    correctAnswer: "//"
  }
]

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
  
  var startCountdown = setInterval(timerCountdown, 1000);

  for (var i = 0; i < quizQuestions.length; i++) {
    console.log(quizQuestions[i]);
  }
};






startQuiz.addEventListener("click", beginQuiz);



