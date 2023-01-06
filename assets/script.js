
// the user chooses selects a answer.
// is then told, correct or wrong.
// if question is answered wrong, then extra seconds are subtracted from timer 
// upon selection a new question needs to appear with new answers 
// after so many questions, the game ends
// if the timer hits 0, the player loses
// if the game ends before the timer hits 0, i need to record a score
// if a score is recorded, i need a spot for user to enter name 
// then i need a high score box to display names and scores(local storage) 
// then i need buttons to start again 
// need a button to clear high scores 
// have scoreboard shown on page

var quizMaterial = [
    {
        questionNum: 0,
        question: "__________ is used by programmers across the world to create dynamic and interactive web content like applications and browsers.",
        choices: ["JavaScript", "JavaMocha", "FunctionScript", "DuckRace"],
        answer: "JavaScript"
    },
    {
        questionNum: 1,
        question: "The __________ method calls a function at specified intervals.",
        chocies: ["setTime", "timeInterval", "setInterval", "intervalStart"],
        answer: "setInterval"
    },
    {
        questionNum: 2,
        question: "What property allows sites to save key-value pairs in a web browser with no expiration date?",
        choices: ["Cloud Storage", "Local Storage", "MySpace", "Web Browser Storage"],
        answer: "Local Storage"
    },
    {
        questionNum: 3,
        question: " __________ is a social media platform used to cooperatively work on web development.",
        choices: ["GitDev", "WebDev.1", "MarkCarl", "Github"],
        answer: "Github"
    },
    {
        questionNum: 4,
        question: " __________ is used to attach an element to another element.",
        choices: [".addElem", ".elementAdd", ".appendChild", ".appendElem"],
        answer: ".appendChild"
    },
    {
        questionNum: 5,
        question: "The __________ property sets or returns the text content of the specified node, and all its descendants.",
        chocies: [".textSet", ".settingText", ".textContent", ".containText"],
        answer: ".textContent"
    }
];

var startElem = document.getElementById("startEl");
var countdownEl = document.getElementById("countdown");
var answerElem = document.getElementById("answerEl");
var questionElem = document.getElementById("questionEl");
var answerBtn = document.querySelector("#answerbox");
var playAgainBtn = document.createElement("button");
var questionNumber = 0;
var secondsLeft = 90;

var startBtn = document.querySelector(".startbtn");
startBtn.addEventListener("click", timeDown);

var resetBtn = document.querySelector(".resetgamebtn");
resetBtn.addEventListener("click", function () {
    window.location.reload();
})

function timeDown() {
    startElem.style.display = "none";
    answerElem.textContent = "";
    countdownEl.textContent = "90 Seconds Left!"
    playAgainBtn.remove();

    // This is the timer that counts down
    var countdownTimer = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " Seconds Left!";
        // If the timer hits 0, the game ends 
        if (secondsLeft <= 0) {
            clearInterval(countdownTimer);
            questionElem.textContent = "";
            answerbox.textContent = "";
            countdownEl.textContent = "Time is Out. Game Over!";
            secondsLeft = 90;
            questionNumber = 0;
            // !!! need function to make high score box entry appear and play again button.
            playAgain();
        }
    }, 1000)

    showQuestions(quizMaterial[questionNumber]);
}

function playAgain() {
    playAgainBtn.textContent = "Play Again?"
    playAgainBtn.className = "playAgain";
    document.getElementById("startAgain").appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", timeDown);
}

function showQuestions(quizMaterial) {
    questionElem.textContent = quizMaterial.question;

    for (i = 0; i < quizMaterial.choices.length; i++) {
        if (i <= quizMaterial.choices.length) {
            var answers = document.createElement("button");
            answers.textContent = quizMaterial.choices[i];
            answers.className = "answerChoices";
            answers.setAttribute("style", "font-size: 20px")
            document.getElementById("answerbox").appendChild(answers);
            var answerChoicesEl = document.querySelectorAll(".answerChoices")
            for (j = 0; j < answerChoicesEl.length; j++) {
                answerChoicesEl[i].addEventListener("click", answerCheck)
            }
            function answerCheck(event) {
                if (event.target.textContent === quizMaterial.answer) {
                    countdownEl.prepend("Correct! ")
                    showQuestions(quizMaterial[questionNumber])
                } else {
                    countdownEl.prepend("Wrong! ")
                    secondsLeft -= 10
                }
            }
        }
    }
    questionNumber++
    console.log(questionNumber)
}
// *** need this function to store a name input & score from timer to local storage
// function recordScore() {
//     var enterName = document.createElement("input");
//     document.getElementById("startAgain").appendChild(enterName);
// }

// ADD AND REMOVE CLASSES TO HIDE THINGS


