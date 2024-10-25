const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const feedback = document.getElementById('feedback');

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'High-Level Text Markup Language', correct: false },
            { text: 'Hypertext Multi-Language', correct: false },
            { text: 'Hypertext Markup Link', correct: false },
        ],
    },
    {
        question: 'Which of these is a JavaScript framework?',
        answers: [
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Ruby on Rails', correct: false },
            { text: 'Laravel', correct: false },
        ],
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style System', correct: false },
            { text: 'Colorful Style Sheets', correct: false },
            { text: 'Cascading Simple Sheets', correct: false },
        ],
    },
    {
        question: 'Which company developed JavaScript?',
        answers: [
            { text: 'Netscape', correct: true },
            { text: 'Microsoft', correct: false },
            { text: 'Oracle', correct: false },
            { text: 'IBM', correct: false },
        ],
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        answers: [
            { text: 'styles', correct: false },
            { text: 'style', correct: true },
            { text: 'class', correct: false },
            { text: 'font', correct: false },
        ],
    },
    {
        question: 'Which HTML element is used to define the title of a document?',
        answers: [
            { text: '<title>', correct: true },
            { text: '<head>', correct: false },
            { text: '<meta>', correct: false },
            { text: '<link>', correct: false },
        ],
    },
    {
        question: 'What does DOM stand for?',
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Data Object Model', correct: false },
            { text: 'Document Operating Model', correct: false },
            { text: 'Data Organization Model', correct: false },
        ],
    },
    {
        question: 'Which language is used for styling web pages?',
        answers: [
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: true },
            { text: 'JavaScript', correct: false },
            { text: 'XML', correct: false },
        ],
    },
    {
        question: 'Which symbol is used for comments in JavaScript?',
        answers: [
            { text: '//', correct: true },
            { text: '#', correct: false },
            { text: '/*', correct: false },
            { text: '*/', correct: false },
        ],
    },
    {
        question: 'Which tag is used to create a hyperlink in HTML?',
        answers: [
            { text: '<a>', correct: true },
            { text: '<link>', correct: false },
            { text: '<url>', correct: false },
            { text: '<hyperlink>', correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    feedback.style.display = 'none'; // Hide feedback initially
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    feedback.style.display = 'none'; // Reset feedback display
    if (answer.correct) {
        score++;
        feedback.innerText = "Correct!";
        feedback.style.color = 'green'; // Change color to green for correct answer
        feedback.style.display = 'block'; // Show feedback
        nextButton.style.display = 'block'; // Show next button for manual next
        // Automatically go to the next question after 1 second if the answer is correct
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
                nextButton.style.display = 'none'; // Reset next button
                feedback.style.display = 'none'; // Hide feedback
            } else {
                showResult();
            }
        }, 1000);
    } else {
        feedback.innerText = "Not correct! Please try again.";
        feedback.style.color = 'red'; // Change color to red for incorrect answer
        feedback.style.display = 'block'; // Show feedback
        nextButton.style.display = 'none'; // Do not show next button
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = 'none'; // Reset next button
        feedback.style.display = 'none'; // Hide feedback
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

restartButton.addEventListener('click', startQuiz);

// Start the quiz when the page loads
startQuiz();
