// _________ is used by programmers across the world to create dynamic and interactive web content like applications and browsers.
// JavaScript, JavaMocha, FunctionScript, DuckRace
// The _________ method calls a function at specified intervals.
// setInterval, setTime, timeInterval, intervalStart

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

// QUESTIONS 
// use a 2 arrays inside of an array
// array[0] is the question
// array[1] is the answer choices
// append [0] to the id=questionEl
// append [1] to the id=answerEl
// this is a function that is called up when time down starts


var countdownEl = document.getElementById("countdown");
var secondsLeft = 91;

var startBtn = document.querySelector(".startbtn");
startBtn.addEventListener("click", timeDown);

function timeDown() {
    // These 2 lines remove the welcome message
    var welcome = document.getElementById("answerEl");
    if (welcome) {
        welcome.textContent = "";
    }
    // These 2 lines remove the start button
    var startElem = document.getElementById("startEl");
    if (startElem) {
        startElem.remove();
    }
    var questionElem = document.getElementById("questionEl");
    if (questionElem) {
        questionElem.textContent = "";
    }
    playBtn.remove();

    // This is the timer that counts down
    var countdownTimer = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " Seconds Left!";
        // If the timer hits 0, the game ends 
        if (secondsLeft === 0) {
            clearInterval(countdownTimer);
            countdownEl.textContent = "Time is Out. Game Over!";
            secondsLeft = 91;
            // !!! need function to make high score box entry appear and play again button.
            playAgain();
            document.getElementById("wordbox").textContent = "";
        }
    }, 1000)

    showQuestions();
};


var quizMaterial = [
    ["__________ is used by programmers across the world to create dynamic and interactive web content like applications and browsers.",
        ["JavaScript", "JavaMocha", "FunctionScript", "DuckRace"],
        [0]],
    ["The __________ method calls a function at specified intervals.",
        ["setTime", "timeInterval", "setInterval", "intervalStart"],
        [2]],
    ["What property allows sites to save key-value pairs in a web browser with no expiration date?",
        ["Cloud Storage", "Local Storage", "MySpace", "Web Browser Storage"],
        [1]]
]
// will need to make a way to loop through questions when a answer is selected. 
var question = document.createElement("h2");
function showQuestions() {

    question.textContent = quizMaterial[0][0]
    document.getElementById("wordbox").appendChild(question);

    for (i = 0; i < quizMaterial[0][1].length; i++) {
        if (i <= quizMaterial[0][1].length) {
            var answers = document.createElement("button");
            answers.textContent = quizMaterial[0][1][i];
            answers.className = "answerChoices";
            answers.setAttribute("id", [i]);
            answers.setAttribute("style", "font-size: 20px")
            document.getElementById("wordbox").appendChild(answers);
        }
    }
    var answerBtn = document.querySelectorAll(".answerChoices");
    answerBtn.addEventListener("click", answerCheck)
};

function answerCheck() {
    console.log("Hello");
}

var playBtn = document.createElement("button");
playBtn.addEventListener("click", timeDown);

function playAgain() {
    question.className = "questionPrompt"
    playBtn.textContent = "Play Again?"
    playBtn.className = "playAgain";
    document.getElementById("startAgain").appendChild(playBtn);
}

// *** need this function to store a name input & score from timer to local storage
function recordScore() {
    var enterName = document.createElement("input");
    document.getElementById("startAgain").appendChild(enterName);
}

// ADD AND REMOVE CLASSES TO HIDE THINGS