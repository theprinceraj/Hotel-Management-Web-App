$(document).ready(function () {
    // Register button click event
    // $('#registerBtn').click(function () {
    //     // Get input values
    //     var username = $('#username').val();
    //     var password = $('#password').val();
    //     var repassword = $('#repassword').val();

    //     // Perform basic client-side validation
    //     if (username === '' || password === '' || repassword === '') {
    //         alert('Please enter all required fields.');
    //         return;
    //     }

    //     if (password !== repassword) {
    //         alert('Passwords do not match.');
    //         return;
    //     }

    //     // Send an AJAX request to the server for registration
    //     $.ajax({
    //         type: 'POST',
    //         url: '/register', // The server-side registration endpoint
    //         data: {
    //             username: username,
    //             password: password
    //         },
    //         success: function (response) {
    //             // Handle the server response here
    //             if (response.success) {
    //                 // Registration successful, display success message or redirect to the login page
    //                 alert('Registration successful! Please login with your credentials.');
    //                 window.location.href = '/login'; // The login page URL
    //             } else {
    //                 // Registration failed, display an error message
    //                 alert('Registration failed. ' + response.message);
    //             }
    //         },
    //         error: function (error) {
    //             // Handle any network or server errors here
    //             alert('An error occurred. Please try again later.');
    //         }
    //     });
    // });

    $('#registerBtn').click(() => {
        // Get input values
        var username = $('#username').val();
        var password = $('#password').val();
        var repassword = $('#repassword').val();

        // Perform basic client-side validation
        if (username === '' || password === '' || repassword === '') {
            alert('Please enter all required fields.');
            return;
        }

        if (password !== repassword) {
            alert('Passwords do not match.');
            return;
        }

        fetch('http://localhost:3000/Credentials', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.id) alert('Registration succesful!');
            else alert('Registration succesful!');
        })
        .catch(err => console.log(err))
    })
});
