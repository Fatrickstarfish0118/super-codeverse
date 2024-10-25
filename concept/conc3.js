const questions = [
  {
    question: "What is a class in OOP?",
    answers: [
      { text: "A blueprint for creating objects.", correct: true },
      { text: "A function to define behavior.", correct: false },
      { text: "An instance of an object.", correct: false },
      { text: "A type of variable.", correct: false }
    ]
  },
  {
    question: "What is an object in OOP?",
    answers: [
      { text: "A single entity that contains properties and methods.", correct: true },
      { text: "A collection of functions.", correct: false },
      { text: "A type of class.", correct: false },
      { text: "A type of data structure.", correct: false }
    ]
  },
  {
    question: "What does encapsulation mean?",
    answers: [
      { text: "Hiding the internal state of an object.", correct: true },
      { text: "Inheriting properties from another class.", correct: false },
      { text: "Creating multiple instances of a class.", correct: false },
      { text: "Overriding methods in a subclass.", correct: false }
    ]
  },
  {
    question: "Which of the following is an example of inheritance?",
    answers: [
      { text: "A class inheriting methods from another class.", correct: true },
      { text: "Creating a function inside a class.", correct: false },
      { text: "Using methods from the Math library.", correct: false },
      { text: "Defining a property in an object.", correct: false }
    ]
  },
  {
    question: "What is polymorphism?",
    answers: [
      { text: "The ability of different classes to be treated as instances of the same class.", correct: true },
      { text: "The ability to create multiple objects from a single class.", correct: false },
      { text: "The process of creating new methods in a class.", correct: false },
      { text: "The restriction of access to certain properties.", correct: false }
    ]
  },
  {
    question: "What keyword is used to create a class in JavaScript?",
    answers: [
      { text: "class", correct: true },
      { text: "create", correct: false },
      { text: "function", correct: false },
      { text: "object", correct: false }
    ]
  },
  {
    question: "What is a constructor in OOP?",
    answers: [
      { text: "A method for initializing object properties.", correct: true },
      { text: "A type of variable.", correct: false },
      { text: "A way to create a class.", correct: false },
      { text: "A function to perform operations.", correct: false }
    ]
  },
  {
    question: "What does the 'this' keyword refer to in a class?",
    answers: [
      { text: "The current instance of the class.", correct: true },
      { text: "The parent class.", correct: false },
      { text: "The global object.", correct: false },
      { text: "The method being executed.", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a characteristic of OOP?",
    answers: [
      { text: "Encapsulation", correct: false },
      { text: "Abstraction", correct: false },
      { text: "Recursion", correct: true },
      { text: "Inheritance", correct: false }
    ]
  },
  {
    question: "How can you inherit from a parent class in JavaScript?",
    answers: [
      { text: "By using the extends keyword.", correct: true },
      { text: "By using the inherits keyword.", correct: false },
      { text: "By using the superclass method.", correct: false },
      { text: "By using the parent keyword.", correct: false }
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
