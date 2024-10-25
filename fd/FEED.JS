// Function to save feedback in local storage
function saveFeedback(name, section, message) {
    const feedback = {
        name: name,
        section: section,
        message: message
    };

    let feedbackList = localStorage.getItem('feedbacks') ? JSON.parse(localStorage.getItem('feedbacks')) : [];

    feedbackList.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbackList));
}

// Function to load feedback from local storage and display it
function loadFeedback() {
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    feedbackDisplay.innerHTML = '';  // Clear existing feedback

    const feedbackList = localStorage.getItem('feedbacks') ? JSON.parse(localStorage.getItem('feedbacks')) : [];

    feedbackList.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');

        feedbackItem.innerHTML = `
            <h3>${feedback.name} - ${feedback.section}</h3>
            <p>${feedback.message}</p>
        `;

        feedbackDisplay.appendChild(feedbackItem);
    });
}

// Form submit event
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const section = document.getElementById('section').value;
    const message = document.getElementById('message').value;

    saveFeedback(name, section, message);

    // Clear the form
    document.getElementById('feedbackForm').reset();

    // Reload feedback display
    loadFeedback();
});

// Load feedback on page load
window.onload = loadFeedback;
