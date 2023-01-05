// the start button starts a countdown timer, has a question appear, answer choices appear
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
var answerBtn = document.querySelectorAll(".answerChoices");
console.log(answerBtn);
var secondsLeft = 10;

var startBtn = document.querySelector(".startbtn");
startBtn.addEventListener("click", timeDown);

function timeDown() {
    startElem.style.display = "none";
    answerElem.textContent = "";
    countdownEl.textContent = "90 Seconds Left!"
    playBtn.remove();

    // This is the timer that counts down
    var countdownTimer = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " Seconds Left!";
        // If the timer hits 0, the game ends 
        if (secondsLeft === 0) {
            clearInterval(countdownTimer);
            countdownEl.textContent = "Time is Out. Game Over!";
            secondsLeft = 10;
            // !!! need function to make high score box entry appear and play again button.
            playAgain();
            questionElem.textContent = "";
            answerBtn.style.display = "none";
        }
    }, 1000)

    showQuestions();
};

var playBtn = document.createElement("button");
playBtn.addEventListener("click", timeDown);

function playAgain() {
    question.className = "questionPrompt"
    playBtn.textContent = "Play Again?"
    playBtn.className = "playAgain";
    document.getElementById("startAgain").appendChild(playBtn);
}

// *** need this function to store a name input & score from timer to local storage
// function recordScore() {
//     var enterName = document.createElement("input");
//     document.getElementById("startAgain").appendChild(enterName);
// }

// ADD AND REMOVE CLASSES TO HIDE THINGS


// // will need to make a way to loop through questions when a answer is selected. 
// var question = document.createElement("h2");
// function showQuestions() {

//     questionElem.textContent = quizMaterial[0][0];

//     for (i = 0; i < quizMaterial[0][1].length; i++) {
//         if (i <= quizMaterial[0][1].length) {
//             var answers = document.createElement("button");
//             answers.textContent = quizMaterial[0][1][i];
//             answers.className = "answerChoices";
//             answers.setAttribute("id", [i]);
//             answers.setAttribute("style", "font-size: 20px")
//             document.getElementById("wordbox").appendChild(answers);
//         }
//     }
// };

