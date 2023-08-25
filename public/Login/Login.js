$(document).ready(() => {
  $("#loginBtn").click(() => {
    var inputUsername = $("#username").val();
    var inputPassword = $("#password").val();

    if (inputUsername === "" || inputPassword === "") {
      alert("Please enter both username and password.");
      return;
    }

    fetch("http://localhost:3000/Credentials")
      .then((response) => response.json())
      .then((json) => {
        console.log(checkLoginIdPassword(json, inputUsername, inputPassword))
        if (checkLoginIdPassword(json, inputUsername, inputPassword)) {
          alert("Logged in with username: " + inputUsername + ", password: " + inputPassword);
          // Redirect to hostel management system page after successful login
          window.location.href = "/final.html";
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((err) => console.log(err));
  });

  function checkLoginIdPassword(json, usernameEntered, passwordEntered) {
    // Loop through the credentials array
    for (let user of json) {
      if (
        user.username === usernameEntered ||
        user.password === passwordEntered
      ) {
        return true;
      }

    }
    return false;
  }
});
