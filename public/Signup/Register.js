$(document).ready(function () {
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

        // creating a new profile with entered username
        fetch('http://localhost:3000/Profile', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userName: username })
        }).catch(err => {})

        // creating a new username, password pair with entered username
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
                    alert('Registration succesful!');
                    window.location.replace("http://localhost:3000/Login/Login.html");
                }
                else
                    alert('Registration failed!');
            })
            .catch(err => console.log(err))
    })
});
