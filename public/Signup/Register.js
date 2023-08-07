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

        fetch('http://localhost:3000/Credentials', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) alert('Registration succesful!');
                else alert('Registration succesful!');
            })
            .catch(err => console.log(err))
    })
});
