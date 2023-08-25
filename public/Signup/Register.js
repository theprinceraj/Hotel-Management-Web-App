$(document).ready(function () {
    $('#registerBtn').click(() => {
        var username = $('#username').val();
        var password = $('#password').val();
        var repassword = $('#repassword').val();

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
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    console.log('Registration successful:', data);
                    window.location.href = "/Login/Login.html";
                    alert('Registration successful! You will now be redirected to the login page.');


                } else {
                    console.error('Registration failed:', data);
                    alert('Registration failed.');
                }
            })
            .catch(err => {
                console.error('Error during registration:', err);
                alert('An error occurred during registration.');
            });
    });
});
