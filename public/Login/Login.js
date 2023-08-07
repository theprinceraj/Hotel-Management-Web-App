 $(document).ready(function () {
            // Code for handling the login button click
            $('#loginBtn').click(function () {
                var username = $('#username').val();
                var password = $('#password').val();

                // Perform validation
                if (username === "" || password === "") {
                   alert("Please enter both username and password.");
                   return;
                  }

                // Perform login request (replace with your actual login logic)
               // Here you can send an AJAX request to your server-side code for authentication
               // For demonstration purposes, we will just display the entered username and password
               alert("Logged in with username: " + username + ", password: " + password);


                // Perform login authentication here

                // Redirect to hostel management system page after successful login
                window.location.href = "/new/3HostelPic/HostelPic.html";
                
            });
        });

//  $(document).ready(function() {
//   // Login button click event
//   $('#loginBtn').click(function() {
//     // Get input values
//     var username = $('#username').val();
//     var password = $('#password').val();

//     // Perform basic client-side validation
//     if (username === '' || password === '') {
//       alert('Please enter both username and password.');
//       return;
//     }

//     // Simulate an AJAX request to the server for login
//     // Replace this code with actual server-side authentication logic
//     $.ajax({
//       type: 'POST',
//       url: '/login', // Replace with the actual server-side login endpoint
//       data: {
//         username: username,
//         password: password
//       },
//       success: function(response) {
//         // Handle the server response here
//         if (response.success) {
//           // Login successful, redirect to the dashboard or desired page
//           window.location.href = '/dashboard'; // Replace with the desired page URL
//         } else {
//           // Login failed, display an error message
//           alert('Invalid username or password.');
//         }
//       },
//       error: function(xhr, status, error) {
//         // Handle the AJAX request error here
//         alert('An error occurred while processing the login request.');
//       }
//     });
//   });
// });


//  Please note that the code above simulates the login functionality on the client-side using jQuery AJAX. In a real application, you would need to replace the simulated AJAX request with an actual server-side implementation that handles the authentication logic and responds accordingly.

// Also, make sure to update the url property in the AJAX request with the actual server-side login endpoint and modify the success callback to suit your application's requirements, such as redirecting to the appropriate page upon successful login.

// Remember to implement server-side validation and security measures to ensure the login process is secure and protected against common vulnerabilities.


  
  