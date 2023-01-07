// upon selection a new question needs to appear with new answers 
// after so many questions, the game ends
// if the game ends before the timer hits 0, i need to record a score
// if a score is recorded, i need a spot for user to enter name 
// then i need a high score box to display names and scores(local storage) 
// then i need buttons to start again 
// need a button to clear high scores 
// have scoreboard shown on page

var quizMaterial = [
    {
        question: "__________ is used by programmers across the world to create dynamic and interactive web content like applications and browsers.",
        choices: ["JavaScript", "JavaMocha", "FunctionScript", "DuckRace"],
        answer: "JavaScript"
    },
    {
        question: "The __________ method calls a function at specified intervals.",
        choices: ["setTime", "timeInterval", "setInterval", "intervalStart"],
        answer: "setInterval"
    },
    {
        question: "What property allows sites to save key-value pairs in a web browser with no expiration date?",
        choices: ["Cloud Storage", "Local Storage", "MySpace", "Web Browser Storage"],
        answer: "Local Storage"
    },
    {
        question: " __________ is a social media platform used to cooperatively work on web development.",
        choices: ["GitDev", "WebDev.1", "MarkCarl", "Github"],
        answer: "Github"
    },
    {
        question: " __________ is used to attach an element to another element.",
        choices: [".addElem", ".elementAdd", ".appendChild", ".appendElem"],
        answer: ".appendChild"
    },
    {
        question: "The __________ property sets or returns the text content of the specified node, and all its descendants.",
        choices: [".textSet", ".settingText", ".textContent", ".containText"],
        answer: ".textContent"
    }
];

var startElem = document.getElementById("startEl");
var countdownEl = document.getElementById("countdown");
var answerElem = document.getElementById("answerEl");
var questionElem = document.getElementById("questionEl");
var playAgainBtn = document.createElement("button");
var startAgain = document.getElementById("startAgain");
var enterName = document.createElement("input");
enterName.setAttribute("id", "nameBox");
enterName.setAttribute("type", "text");
enterName.setAttribute("class", "nameStyle")

var questionNumber = 0;
var secondsLeft = 90;
var countdownTimer;


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
    enterName.remove();
    submitBtn.remove();

    // This is the timer that counts down
    countdownTimer = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " Seconds Left!";
        // If the timer hits 0, the game ends 
        if (secondsLeft <= 0) {
            clearInterval(countdownTimer);
            questionElem.textContent = "";
            answerbox.textContent = "";
            countdownEl.textContent = "Time is Out. Game Over!";
            secondsLeft = 90;
            playAgain();
        }
    }, 1000)
    showQuestions(quizMaterial[questionNumber]);
}

function playAgain() {
    secondsLeft = 90;
    questionNumber = 0;
    playAgainBtn.textContent = "Play Again?"
    playAgainBtn.className = "playAgain";
    startAgain.appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", timeDown);
}

function showQuestions(quizTime) {
    questionElem.textContent = quizTime.question;

    for (i = 0; i < quizTime.choices.length; i++) {
        if (i <= quizTime.choices.length) {
            var answers = document.createElement("button");
            answers.textContent = quizTime.choices[i];
            answers.className = "answerChoices";
            answers.setAttribute("style", "font-size: 20px")
            document.getElementById("answerbox").appendChild(answers);
            var answerChoicesEl = document.querySelectorAll(".answerChoices")
            answerChoicesEl[i].addEventListener("click", answerCheck)
            function answerCheck(event) {
                if (event.target.textContent === quizTime.answer) {
                    answerbox.textContent = "";
                    countdownEl.prepend("Correct! ")
                    if (questionNumber === 6) {
                        questionElem.textContent = "Your score is " + secondsLeft + " points! Nice work!";
                        console.log(secondsLeft)
                        countdownEl.textContent = "You Won! Enter your name to record your score."
                        recordScore();
                        playAgain();
                        clearInterval(countdownTimer);
                    } else {
                        showQuestions(quizMaterial[questionNumber])
                    }
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

var submitBtn = document.createElement("input");
submitBtn.setAttribute("class", "submitBtn");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("value", "Submit");

// *** need this function to store a name input & score from timer to local storage
function recordScore() {
    startAgain.appendChild(enterName);
    startAgain.appendChild(submitBtn);
    var playerName = document.getElementById("nameBox");
    var playerScore = secondsLeft;
    console.log(playerName);
    console.log(playerScore);
}

submitBtn.addEventListener("submit", recordName)

function recordName() {
    console.log(enterName.val())
}



