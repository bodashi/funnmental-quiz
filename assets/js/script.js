var startQuiz = document.querySelector("#start-quiz");
var startTimer = document.querySelector("#quizTimer");

var timerCount = 60;

var beginQuiz = function () {
  
  var timerCountdown = function () {
    console.log(timerCount);
    
    if (timerCount === 0) {
      alert("Time's Up!!");
      clearInterval(startCountdown);
    }
    timerCount--;
  };

  var startCountdown = setInterval(timerCountdown, 1000);
};






startQuiz.addEventListener("click", beginQuiz);



