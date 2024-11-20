// Questions Data
let questions = [
    {
        question: "Guess which state I am talking about. What state enlarges everything?",
        answers: [
            { text: "Texas", correct: true, explanation: "Texas is known for its large size." },
            { text: "Florida", correct: false, explanation: "The correct answer is Texas. Texas is known for making things big." },
            { text: "Nebraska", correct: false, explanation: "The correct answer is Texas. Nebraska is not known for being large." }
        ]
    },
    {
        question: "In what state are stars born?",
        answers: [
            { text: "California", correct: true, explanation: "California is famous for its celebrities." },
            { text: "New York", correct: false, explanation: "The correct answer is California. It's famous for its celebrities." },
            { text: "Arizona", correct: false, explanation: "The correct answer is California. Arizona is not associated with this." }
        ]
    },
    {
        question: "What state is known as the diamond state?",
        answers: [
            { text: "Arkansas", correct: true, explanation: "Arkansas is known as the 'Diamond State'." },
            { text: "Alabama", correct: false, explanation: "The correct answer is Arkansas. It's known as the 'Diamond State'." },
            { text: "Missouri", correct: false, explanation: "The correct answer is Arkansas. Missouri is not known for diamonds." }
        ]
    },
    {
        question: "What state has the happiest world on Earth?",
        answers: [
            { text: "Florida", correct: true, explanation: "Disney World is in Florida." },
            { text: "California", correct: false, explanation: "The correct answer is Florida. Disney World is in Florida." },
            { text: "Nevada", correct: false, explanation: "The correct answer is Florida. Nevada isn't associated with this." }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const completionScreen = document.getElementById("completion-screen");
const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const explanationContainer = document.getElementById("explanation");

// Start Button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    showQuestion(currentQuestionIndex);
});

// Show Question
function showQuestion(index) {
    const question = questions[index];
    questionElement.textContent = question.question;
    answersContainer.innerHTML = "";
    explanationContainer.classList.add("hidden");

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", checkAnswer);
        answersContainer.appendChild(button);
    });
}

// Check Answer
function checkAnswer(event) {
    const isCorrect = event.target.dataset.correct === "true";
    const selectedAnswer = questions[currentQuestionIndex].answers.find(answer => answer.text === event.target.textContent);

    if (isCorrect) {
        event.target.classList.add("correct");
        score += 1;
        scoreContainer.classList.remove("wrong");
        scoreContainer.classList.add("correct");
    } else {
        event.target.classList.add("wrong");
        scoreContainer.classList.remove("correct");
        scoreContainer.classList.add("wrong");
    }

    explanationContainer.textContent = selectedAnswer.explanation;
    explanationContainer.classList.remove("hidden");
    scoreDisplay.textContent = score;

    // Disable all buttons
    const buttons = answersContainer.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);

    // Next question or finish
    setTimeout(() => {
        currentQuestionIndex += 1;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            scoreContainer.classList.remove("correct", "wrong");
        } else {
            gameScreen.classList.add("hidden");
            completionScreen.classList.remove("hidden");
        }
    }, 3000);
}
