function validateForm() {
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var message = document.getElementById('messageInput').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return false; // Prevent form submission
    } else {
        // Success message
        if (confirm("Do you want sent message ?")) {
            alert('Message sent successfully!');
            document.getElementById('nameInput').value = '';
            document.getElementById('emailInput').value = '';
            document.getElementById('messageInput').value = '';
            return true; // Allow form submission
        }
    }
}