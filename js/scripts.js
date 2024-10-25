// Function to display messages
function displayMessages() {
    const messageList = document.getElementById('messages');
    messageList.innerHTML = ''; // Clear existing messages
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach((msg, index) => {
        const newMessage = document.createElement('li');
        newMessage.textContent = `${msg.name}: ${msg.message}`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function() {
            deleteMessage(index); // Call deleteMessage function with index
        };

        newMessage.appendChild(deleteButton);
        messageList.appendChild(newMessage);
    });
}

// Function to send message
document.getElementById('sendButton').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();

    if (studentName && messageText) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name: studentName, message: messageText });
        localStorage.setItem('messages', JSON.stringify(messages));
        
        messageInput.value = ''; // Clear the input
        displayMessages(); // Refresh the message display
    } else {
        alert('Please enter both your name and a message.');
    }
});

// Function to delete a message
function deleteMessage(index) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.splice(index, 1); // Remove message at the specified index
    localStorage.setItem('messages', JSON.stringify(messages)); // Update local storage
    displayMessages(); // Refresh the message display
}

// Initial display of messages
displayMessages();

let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

// Optional: Auto-slide every 5 seconds
setInterval(() => {
  moveSlide(1);
}, 5000);
