const questions = [
  {
    question: "What is the purpose of a version control system?",
    answers: [
      { text: "To track changes in code", correct: true },
      { text: "To compile code", correct: false },
      { text: "To manage databases", correct: false },
      { text: "To write documentation", correct: false }
    ]
  },
  {
    question: "Which of the following is a popular text editor?",
    answers: [
      { text: "Eclipse", correct: false },
      { text: "Sublime Text", correct: true },
      { text: "Photoshop", correct: false },
      { text: "PowerPoint", correct: false }
    ]
  },
  {
    question: "What does IDE stand for?",
    answers: [
      { text: "Integrated Development Environment", correct: true },
      { text: "Integrated Design Editor", correct: false },
      { text: "Interactive Development Environment", correct: false },
      { text: "Interconnected Data Environment", correct: false }
    ]
  },
  {
    question: "Which tool is commonly used for debugging code?",
    answers: [
      { text: "Browser DevTools", correct: true },
      { text: "File Explorer", correct: false },
      { text: "Image Editor", correct: false },
      { text: "Database Manager", correct: false }
    ]
  },
  {
    question: "What is Git primarily used for?",
    answers: [
      { text: "Web hosting", correct: false },
      { text: "Source code management", correct: true },
      { text: "User interface design", correct: false },
      { text: "Data analysis", correct: false }
    ]
  },
  {
    question: "Which of the following is a cloud-based IDE?",
    answers: [
      { text: "Visual Studio Code", correct: false },
      { text: "CodeSandbox", correct: true },
      { text: "Eclipse", correct: false },
      { text: "Notepad++", correct: false }
    ]
  },
  {
    question: "What is the main function of a compiler?",
    answers: [
      { text: "To run the code", correct: false },
      { text: "To translate code into machine language", correct: true },
      { text: "To format code", correct: false },
      { text: "To debug code", correct: false }
    ]
  },
  {
    question: "Which tool is used for package management in Node.js?",
    answers: [
      { text: "npm", correct: true },
      { text: "pip", correct: false },
      { text: "Gem", correct: false },
      { text: "Composer", correct: false }
    ]
  },
  {
    question: "What is a framework?",
    answers: [
      { text: "A tool for managing databases", correct: false },
      { text: "A library for building applications", correct: true },
      { text: "A method for testing code", correct: false },
      { text: "An operating system", correct: false }
    ]
  },
  {
    question: "Which of the following is a web development framework?",
    answers: [
      { text: "Django", correct: true },
      { text: "Photoshop", correct: false },
      { text: "Excel", correct: false },
      { text: "PowerPoint", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const scoreBarElement = document.getElementById('score-bar');

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  scoreBarElement.style.width = '0%'; // Reset the score meter
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  if (correct) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    updateScoreMeter();
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  // Automatically proceed to the next question after 1 second
  setTimeout(nextQuestion, 1000);
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.style.backgroundColor = '#28a745'; // Green for correct
  } else {
    element.style.backgroundColor = '#dc3545'; // Red for incorrect
  }
}

function clearStatusClass(element) {
  element.style.backgroundColor = '';
}

function updateScoreMeter() {
  const percentage = (score / questions.length) * 100;
  scoreBarElement.style.width = `${percentage}%`;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.innerText = `Great job! You finished the quiz. Your final score is ${score}/${questions.length}.`;
  answerButtonsElement.innerHTML = ''; // Clear buttons after quiz ends

  // Create buttons for Try Again or Back to Home
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  if (score === questions.length) {
    const homeButton = document.createElement('button');
    homeButton.innerText = "Back to Home";
    homeButton.classList.add('btn');
    homeButton.addEventListener('click', () => {
      window.location.href = 'index.html'; // Change this to your homepage URL
    });
    buttonContainer.appendChild(homeButton);
  } else {
    const tryAgainButton = document.createElement('button');
    tryAgainButton.innerText = "Try Again";
    tryAgainButton.classList.add('btn');
    tryAgainButton.addEventListener('click', startGame);
    buttonContainer.appendChild(tryAgainButton);
  }

  answerButtonsElement.appendChild(buttonContainer);
}

startGame();
