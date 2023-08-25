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
                if (data) {
                    console.log('Registration successful:', data);

                    // Create dummy profile for the new user
                    fetch('http://localhost:3000/Profile', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            'userName': username, 'firstName': 'Dummy', 'lastName': 'Dummy', 'address': 'Dummy', 'contact': '6969696969', 'email': 'Dummy@Dum.Dum'
                        })
                    }).then(res => res.json()).then(data => {
                        if (data)
                            console.log('Dummy profile created')
                    }).catch(e => console.error(e))

                    alert('Registration successful! You will now be redirected to the login page.');
                    window.location.href = "/Login/Login.html";


                } else {
                    console.error('Registration failed:', data);
                    alert('Registration failed.');
                }
            })
            .catch(err => {
                console.log('Error during registration:', err);
                alert('An error occurred during registration.');
            });
    });
});
