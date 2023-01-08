// This is an object that stores my quiz material. It holds the question, the choices, and the answer. 
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
        choices: [".appendChild", ".addElem", ".elementAdd", ".appendElem"],
        answer: ".appendChild"
    },
    {
        question: "The __________ property sets or returns the text content of the specified node, and all its descendants.",
        choices: [".textSet", ".settingText", ".textContent", ".containText"],
        answer: ".textContent"
    },
    {
        question: " __________ is a language independent text format for storing and transporting data.",
        choices: ["LITF", "JSON", "dataStore", "LANG"],
        answer: "JSON"
    },
    {
        question: "JavaScript uses __________ to execture a block of code a number of times.",
        choices: ["fruit", "loops", "are", "great"],
        answer: "loops"
    }
];
// These are variables needed for buttons and timers. I am either calling on them in the HTML or I am creating an element. 
var startElem = document.getElementById("startEl");
var countdownEl = document.getElementById("countdown");
var answerElem = document.getElementById("answerEl");
var questionElem = document.getElementById("questionEl");
var playAgainBtn = document.createElement("button");
var startAgain = document.getElementById("startAgain");
var questionNumber = 0;
var secondsLeft = 60;
var countdownTimer;
// The start game button
var startBtn = document.querySelector(".startbtn");
startBtn.addEventListener("click", timeDown);
// The button to reset the game
var resetBtn = document.querySelector(".resetgamebtn");
resetBtn.addEventListener("click", function () {
    window.location.reload();
})
// This is the main function that runs when you start the game. 
function timeDown() {
    // These first 7 lines are used to set the page for it to start. 
    startElem.style.display = "none";
    answerElem.textContent = "";
    countdownEl.textContent = "60 Seconds Left!"
    playAgainBtn.remove();
    enterName.remove();
    submitBtn.remove();
    secondsLeft = 60;

    // This is the timer that counts down
    countdownTimer = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " Seconds Left!";
        // If the timer hits 0, the game ends 
        if (secondsLeft <= 0) {
            // These are all the things that happens when the game ends. 
            clearInterval(countdownTimer);
            questionElem.textContent = "";
            answerbox.textContent = "";
            countdownEl.textContent = "Time is Out. Game Over!";
            secondsLeft = 60;
            playAgain();
        }
    }, 1000)
    // This is where I call the function to show my quiz material, starting at the first index. 
    showQuestions(quizMaterial[questionNumber]);
}
// This function was made so the user can play the game again. 
function playAgain() {
    questionNumber = 0;
    playAgainBtn.textContent = "Play Again?"
    playAgainBtn.className = "playAgain";
    startAgain.appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", timeDown);
}
// This is the function that shows the material. 
function showQuestions(quizTime) {
    questionElem.textContent = quizTime.question;
    // This is a for loop that creates elements to show the choices. It also checks if the user chose the right answer to the question. 
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
                    if (questionNumber === 8) {
                        questionElem.textContent = "Your score is " + secondsLeft + " points! Nice work!";
                        countdownEl.textContent = "You Won! Enter your name to record your score."
                        startAgain.appendChild(enterName);
                        startAgain.appendChild(submitBtn);
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
// These are variables created to store information to use localStorage
var playerName;
var playerScore;
var submitBtn = document.createElement("input");
submitBtn.setAttribute("class", "submitBtn");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("value", "Submit");
submitBtn.addEventListener("click", recordStats)
var enterName = document.createElement("input");
enterName.setAttribute("id", "nameBox");
enterName.setAttribute("type", "text");
enterName.setAttribute("class", "nameStyle")
var userStats = document.getElementById("userStats")
// This function is used to record the name and score of the user. 
function recordStats() {
    if (!enterName.value) {
        return;
    } else {
        playerName = enterName.value
        enterName.value = "";
    }
    playerScore = secondsLeft;
    var userInfo = [playerName, playerScore]
    // This is checking the users score to decide if it is the new high score. 
    if (playerScore >= userInfo[1]) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        highScoreList();

        function highScoreList() {
            var lastScore = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo !== null) {
                userStats.innerHTML = ("<h3>High Score:</h3> \n Name: " + lastScore[0] + "   Score: " + lastScore[1]);
            }
        }
    }
    enterName.remove();
    submitBtn.remove();
}
// This function loads the highest score once the page loads, if the user has previous played the game. 
function showScoreList() {
    var showScore = JSON.parse(localStorage.getItem("userInfo"));
    if (showScore !== null) {
        userStats.append("Name: " + showScore[0] + "   Score: " + showScore[1]);
    }
}
showScoreList();
// This will clear the high score. 
var clearscores = document.getElementById("clearscores");
clearscores.addEventListener("click", function () {
    localStorage.clear();
    userStats.innerHTML = "<h3>High Score:</h3>";
});