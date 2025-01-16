document.addEventListener('contextmenu', event => event.preventDefault());

const questions = [
    {
        id:"01",
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "High-Level Text Management Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        id:"02",
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "<ul>"
    },
    {
        id:"03",
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Custom Style Sheets",
            "Cascading Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        id:"04",
        question: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "background", "color", "background-color"],
        answer: "background-color"
    },
    {
        id:"05",
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "class", "id", "styles"],
        answer: "style"
    },
    {
        id:"06",
        question: "Which CSS framework is most commonly used for responsive design?",
        options: ["Bootstrap", "Foundation", "Bulma", "Tailwind"],
        answer: "Bootstrap"
    },
    {
        id:"07",
        question: "Which method is used to select an element by its ID in JavaScript?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "getElementsByName()"
        ],
        answer: "getElementById()"
    },
    {
        id:"08",
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "/*", "<!-- -->"],
        answer: "//"
    },
    {
        id:"09",
        question: "What is the purpose of the 'let' keyword in JavaScript?",
        options: [
            "Declares a variable with block scope",
            "Declares a variable with global scope",
            "Declares a constant",
            "Declares a variable without scope"
        ],
        answer: "Declares a variable with block scope"
    },
    {
        id:"10",
        question: "What is the default position property of an HTML element in CSS?",
        options: ["relative", "absolute", "static", "fixed"],
        answer: "static"
    },
    {
        id:"11",
        question: "Which tag is used to insert a line break in HTML?",
        options: ["<br>", "<hr>", "<break>", "<lb>"],
        answer: "<br>"
    },
    {
        id:"12",
        question: "What does the 'z-index' property control in CSS?",
        options: [
            "Element stacking order",
            "Element opacity",
            "Element width",
            "Element height"
        ],
        answer: "Element stacking order"
    },
    {
        id:"13",
        question: "Which of the following is not a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Number"],
        answer: "Float"
    },
    {
        id:"14",
        question: "What does the '===' operator do in JavaScript?",
        options: [
            "Compares only values",
            "Compares values and types",
            "Checks for inequality",
            "Assigns a value"
        ],
        answer: "Compares values and types"
    },
    {
        id:"15",
        question: "Which HTML tag is used to embed a video file?",
        options: ["<video>", "<embed>", "<movie>", "<media>"],
        answer: "<video>"
    },
    {
        id:"16",
        question: "Which CSS property is used to align text horizontally?",
        options: ["text-align", "align", "justify", "align-content"],
        answer: "text-align"
    },
    {
        id:"17",
        question: "What does DOM stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Display Object Management",
            "Document Oriented Module"
        ],
        answer: "Document Object Model"
    },
    {
        id:"18",
        question: "What is the purpose of the 'opacity' property in CSS?",
        options: [
            "To change the element’s color",
            "To control the element's transparency",
            "To hide the element",
            "To change the background color"
        ],
        answer: "To control the element's transparency"
    },
    {
        id:"19",
        question: "Which of the following is a semantic HTML tag?",
        options: ["<div>", "<span>", "<article>", "<b>"],
        answer: "<article>"
    },
    {
        id:"20",
        question: "Which JavaScript framework/library is used for building user interfaces?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: "React"
    }
];
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let userAnswers = new Array(questions.length).fill(null);

const registerForm = document.getElementById("user-register");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");

const totalTime = (questions.length) * 10;
let timeRemaining = totalTime;
let timerInterval;

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userName = document.getElementById("name").value;
    document.getElementById("container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    initializeQuiz();
    startTimer();
});

function initializeQuiz() {
    const questionNumbersContainer = document.getElementById("question-numbers");
    questionNumbersContainer.innerHTML = "";

    questions.forEach((_, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");
        questionBox.textContent = index + 1;
        questionBox.dataset.index = index;
        questionBox.addEventListener("click", () => goToQuestion(index));
        questionNumbersContainer.appendChild(questionBox);
    });

    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = `${questions[currentQuestionIndex].id}. ${question.question}`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === option;
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerHTML = `
            <div class="option-item">
            <input type="radio" id="option-${index}" name="option" value="${option}" ${isChecked ? "checked" : ""}>
            <label for="option-${index}">${escapeHTML(option)}</label>
            </div>
        `;
        optionsContainer.appendChild(optionElement);
    });

    updateNavigationButtons();
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
    submitButton.classList.toggle("hidden", currentQuestionIndex !== questions.length - 1);
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;
    if(selectedOption){
        userAnswers[currentQuestionIndex] = selectedOption.value;
        document.querySelector(`.question-box:nth-child(${currentQuestionIndex + 1})`).style.backgroundColor = '#00afaf';
        document.querySelector(`.question-box:nth-child(${currentQuestionIndex + 1})`).style.color = "#fff"
    }
}

prevButton.addEventListener("click", () => {
    saveAnswer();
    applyAnimationToQuestion();
    currentQuestionIndex--;
    displayQuestion();
});

nextButton.addEventListener("click", () => {
    saveAnswer();
    applyAnimationToQuestion();
    currentQuestionIndex++;
    displayQuestion();
});

function applyAnimationToQuestion() {
    const questionElement = document.querySelector(`[data-index="${currentQuestionIndex}"]`);
    if(questionElement){
        questionElement.classList.add("question-animation");
    }
    else(
        questionElement.classList.add("question-animation")
    )

}

submitButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    saveAnswer();
    calculateScore();
    displayResult();
});

function calculateScore() {
    score = questions.reduce((total, question, index) => {
        return total + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
}

function displayResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    const resultContainer = document.querySelector(".result-container");
    resultContainer.classList.remove("hidden");

    document.getElementById("user-name").textContent = `Congratulations ${userName} !`;
    document.getElementById("final-score").textContent = `Score: ${score} / ${questions.length}`;
    
    preventBackNavigation();
    preventReload()
}

function preventBackNavigation(){
    history.pushState(null,null,location.href);

    window.addEventListener('prospate',()=>{
        history.pushState(null,null,location.href)
    });
}
function preventReload() {
    window.addEventListener('beforeunload', function(event) {
        event.preventDefault();
        this.alert("You will be Disqualify, if you reload this page !")
    });
    window.addEventListener('keydown', function(event) {
        if ((event.key === 'F5') || 
            (event.ctrlKey && event.key === 'r') || 
            (event.metaKey && event.key === 'r')) {
            event.preventDefault()
            alert('Reloading is disabled on this page!');
        }
    });
}

function goToQuestion(index) {
    saveAnswer();
    currentQuestionIndex = index;
    displayQuestion();
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuizOnTimeout();
        }
    }, 1000);
}

function submitQuizOnTimeout() {
    saveAnswer();
    calculateScore();
    displayResult();
}