document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Button Clicked: ' + this.previousElementSibling.textContent);
    });
});
