const questions = [
  {
    question: "What is the main characteristic of a stack?",
    answers: [
      { text: "FIFO (First In First Out)", correct: false },
      { text: "LIFO (Last In First Out)", correct: true },
      { text: "Sorted Order", correct: false },
      { text: "Dynamic Size", correct: false }
    ]
  },
  {
    question: "Which data structure uses a key-value pair?",
    answers: [
      { text: "Array", correct: false },
      { text: "List", correct: false },
      { text: "Hash Table", correct: true },
      { text: "Stack", correct: false }
    ]
  },
  {
    question: "What is the time complexity of accessing an element in an array?",
    answers: [
      { text: "O(1)", correct: true },
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: false },
      { text: "O(n^2)", correct: false }
    ]
  },
  {
    question: "Which of the following data structures allows insertion and deletion at both ends?",
    answers: [
      { text: "Queue", correct: false },
      { text: "Stack", correct: false },
      { text: "Deque (Double-ended Queue)", correct: true },
      { text: "Array", correct: false }
    ]
  },
  {
    question: "Which data structure is used to implement recursion?",
    answers: [
      { text: "Stack", correct: true },
      { text: "Queue", correct: false },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false }
    ]
  },
  {
    question: "What type of data structure is a binary tree?",
    answers: [
      { text: "Linear", correct: false },
      { text: "Non-linear", correct: true },
      { text: "Static", correct: false },
      { text: "Dynamic", correct: false }
    ]
  },
  {
    question: "Which of the following has a fixed size?",
    answers: [
      { text: "Array", correct: true },
      { text: "Linked List", correct: false },
      { text: "Stack", correct: false },
      { text: "Queue", correct: false }
    ]
  },
  {
    question: "Which data structure is best suited for implementing a priority queue?",
    answers: [
      { text: "Array", correct: false },
      { text: "Linked List", correct: false },
      { text: "Heap", correct: true },
      { text: "Stack", correct: false }
    ]
  },
  {
    question: "What is the primary drawback of a linked list compared to an array?",
    answers: [
      { text: "Memory Usage", correct: true },
      { text: "Access Time", correct: false },
      { text: "Size", correct: false },
      { text: "Sorting", correct: false }
    ]
  },
  {
    question: "In which data structure is a 'node' a fundamental part?",
    answers: [
      { text: "Array", correct: false },
      { text: "Tree", correct: true },
      { text: "Stack", correct: false },
      { text: "Queue", correct: false }
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
