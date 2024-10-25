// Load posts from local storage
const loadPosts = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        createPostElement(post.title, post.content, post.replies);
    });
};

// Create a post element and append it to the post list
const createPostElement = (title, content, replies = []) => {
    const postList = document.getElementById('postList');

    // Create post element
    const post = document.createElement('div');
    post.classList.add('post');

    post.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <button class="replyButton">Reply</button>
        <div class="replies"></div>
        <form class="replyForm" style="display: none;">
            <textarea placeholder="Write your reply here..." required></textarea>
            <button type="submit">Submit Reply</button>
        </form>
    `;

    // Display existing replies
    const repliesContainer = post.querySelector('.replies');
    replies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.textContent = reply;
        repliesContainer.appendChild(replyElement);
    });

    // Handle reply button click
    post.querySelector('.replyButton').addEventListener('click', () => {
        const replyForm = post.querySelector('.replyForm');
        replyForm.style.display = replyForm.style.display === 'block' ? 'none' : 'block';
    });

    // Handle reply form submission
    post.querySelector('.replyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const replyText = this.querySelector('textarea').value;
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.textContent = replyText;
        repliesContainer.appendChild(replyElement);

        // Update local storage
        const postIndex = [...postList.children].indexOf(post);
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        storedPosts[postIndex].replies.push(replyText);
        localStorage.setItem('posts', JSON.stringify(storedPosts));

        this.reset(); // Clear the reply form
        replyForm.style.display = 'none'; // Hide the form
    });

    postList.prepend(post); // Add new post at the top
};

// Handle new post submission
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    const newPost = { title: postTitle, content: postContent, replies: [] };
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    createPostElement(postTitle, postContent); // Create new post element
    this.reset(); // Clear the form
});

// Load posts when the page is loaded
window.onload = loadPosts;
