$(document).ready(() => {
    // Code for handling the login button click
    $('#loginBtn').click(() => {
        var inputUsername = $('#username').val();
        var inputPassword = $('#password').val();

        // Perform validation
        if (inputUsername === "" || inputPassword === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Perform login request (replace with your actual login logic)

        fetch('http://localhost:3000/Credentials')
            .then((response) => {
                // Parse the response as a JSON object
                return response.json();
            })
            .then((json) => {
                // Loop through the credentials array
                for (let user of json) {
                    // Check if the user email and password match the input
                    if (user.username === inputUsername && user.password === inputPassword) {
                        // For demonstration purposes, we will just display the entered username and password
                        alert("Logged in with username: " + inputUsername + ", password: " + inputPassword);
                        // Redirect to hostel management system page after successful login
                        window.location.href = "/new/3HostelPic/HostelPic.html";
                        // Break the loop
                        break;
                    }

                    // Display an error message
                    alert('Invalid credentials!');
                }
            })
            .catch(err => console.log(err))

    });
});