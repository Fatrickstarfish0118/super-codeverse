const questions = [
  {
    question: "What is the purpose of an if statement in programming?",
    answers: [
      { text: "To execute code based on a condition", correct: true },
      { text: "To create a loop", correct: false },
      { text: "To declare a variable", correct: false },
      { text: "To define a function", correct: false }
    ]
  },
  {
    question: "What keyword is used to create a switch statement?",
    answers: [
      { text: "if", correct: false },
      { text: "case", correct: false },
      { text: "switch", correct: true },
      { text: "loop", correct: false }
    ]
  },
  {
    question: "Which of the following is a correct way to create a for loop?",
    answers: [
      { text: "for (let i = 0; i < 10; i++) {}", correct: true },
      { text: "for (i = 0; i < 10; i++) {}", correct: false },
      { text: "for (let i = 0; i < 10) {}", correct: false },
      { text: "for i = 0 to 10 {}", correct: false }
    ]
  },
  {
    question: "What will the following code output? \nlet x = 10; if (x > 5) { console.log('Yes'); } else { console.log('No'); }",
    answers: [
      { text: "Yes", correct: true },
      { text: "No", correct: false },
      { text: "undefined", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "Which control structure allows you to execute code repeatedly?",
    answers: [
      { text: "If statement", correct: false },
      { text: "Switch statement", correct: false },
      { text: "Loop", correct: true },
      { text: "Function", correct: false }
    ]
  },
  {
    question: "What keyword is used to exit a switch statement?",
    answers: [
      { text: "stop", correct: false },
      { text: "exit", correct: false },
      { text: "break", correct: true },
      { text: "continue", correct: false }
    ]
  },
  {
    question: "Which of the following is not a loop type in JavaScript?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: false },
      { text: "do-while", correct: false },
      { text: "until", correct: true }
    ]
  },
  {
    question: "In a for loop, what does the 'i++' statement do?",
    answers: [
      { text: "Decrement the value of i", correct: false },
      { text: "Increment the value of i", correct: true },
      { text: "Reset the value of i", correct: false },
      { text: "No operation", correct: false }
    ]
  },
  {
    question: "What is the output of the following code? \nlet a = 3; switch (a) { case 3: console.log('Three'); break; default: console.log('Not Three'); }",
    answers: [
      { text: "Three", correct: true },
      { text: "Not Three", correct: false },
      { text: "Error", correct: false },
      { text: "undefined", correct: false }
    ]
  },
  {
    question: "Which control structure is used for multiple conditions?",
    answers: [
      { text: "If statement", correct: false },
      { text: "Switch statement", correct: true },
      { text: "For loop", correct: false },
      { text: "While loop", correct: false }
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
