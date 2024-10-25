// Check if user is logged in
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        showChatSection(username);
    }
    loadMessages();
}

// Login function
function login() {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        localStorage.setItem('username', username);
        showChatSection(username);
    } else {
        alert("Please enter a username!");
    }
}

// Show chat section
function showChatSection(username) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('chatSection').style.display = 'block';
    document.getElementById('userDisplay').textContent = username;
}

// Logout function
function logout() {
    localStorage.removeItem('username');
    location.reload();
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    const username = localStorage.getItem('username');

    if (message) {
        const chatBox = document.getElementById('chatBox');
        const timestamp = new Date().toLocaleTimeString();
        
        const newMessage = `${username} (${timestamp}): ${message}`;
        appendMessage(newMessage);

        // Save message to local storage
        saveMessage(newMessage);

        messageInput.value = ''; // Clear the input field
    }
}

// Append message to chat box
function appendMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Save message to local storage
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => appendMessage(message));
}
