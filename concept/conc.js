const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "const", correct: false },
      { text: "variable", correct: false }
    ]
  },
  {
    question: "What is the correct way to declare a constant in JavaScript?",
    answers: [
      { text: "var x = 10;", correct: false },
      { text: "const x = 10;", correct: true },
      { text: "let x = 10;", correct: false },
      { text: "constant x = 10;", correct: false }
    ]
  },
  {
    question: "What will the following code output? \nlet a = 5; let b = '5'; console.log(a == b);",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "null", correct: false }
    ]
  },
  {
    question: "Which of the following is a correct variable name?",
    answers: [
      { text: "1stName", correct: false },
      { text: "_name", correct: true },
      { text: "first-name", correct: false },
      { text: "let", correct: false }
    ]
  },
  {
    question: "Which of the following data types can a variable hold in JavaScript?",
    answers: [
      { text: "Number", correct: false },
      { text: "String", correct: false },
      { text: "Object", correct: false },
      { text: "All of the above", correct: true }
    ]
  },
  {
    question: "What is the output of the following code? \nlet x = 10; x += 5; console.log(x);",
    answers: [
      { text: "5", correct: false },
      { text: "10", correct: false },
      { text: "15", correct: true },
      { text: "undefined", correct: false }
    ]
  },
  {
    question: "Which of the following is not a valid way to declare a variable?",
    answers: [
      { text: "let name;", correct: false },
      { text: "var name;", correct: false },
      { text: "const name;", correct: false },
      { text: "variable name;", correct: true }
    ]
  },
  {
    question: "What is the scope of a variable declared with the `let` keyword?",
    answers: [
      { text: "Global", correct: false },
      { text: "Function-level", correct: false },
      { text: "Block-level", correct: true },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "What will the following code output? \nlet a = null; console.log(typeof a);",
    answers: [
      { text: '"object"', correct: true },
      { text: '"null"', correct: false },
      { text: '"undefined"', correct: false },
      { text: '"number"', correct: false }
    ]
  },
  {
    question: "Which of the following correctly initializes a variable with a string value?",
    answers: [
      { text: "let greeting = 'Hello, world!';", correct: true },
      { text: 'let greeting = "Hello, world!";', correct: false },
      { text: "Both A and B", correct: false },
      { text: 'let greeting = Hello, world!;', correct: false }
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
  questionElement.innerText = `You finished the quiz. Your final score is ${score}/${questions.length}.`;
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
