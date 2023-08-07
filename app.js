// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Use body-parser middleware to parse JSON data from requests
app.use(bodyParser.json());
// Use express.static middleware to serve static files from the website folder
app.use(express.static(path.join(__dirname, 'public')));
// Use this middleware to parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
// Define the port number for the server to listen on
const port = 3000;

// Define the path to the credentials.json file
const credentialsFile = './credentials.json';

// Define a helper function to read and write the credentials.json file
function readWriteCredentials(username, password) {
    // Read the credentials.json file
    fs.readFile(credentialsFile, 'utf8', (err, data) => {
        if (err) {
            // Handle any file reading errors here
            console.error(err);
            callback(err, null);
        } else {
            // Parse the JSON data from the file
            let credentials = JSON.parse(data);
            credentials.push({ username, password });

            // Write the updated credentials object back to the file
            fs.writeFile(credentialsFile, JSON.stringify(credentials, null, 2), 'utf8', (err) => {
                if (err) {
                    // Handle any file writing errors here
                    console.error(err);
                }
            });
        }
    });
}

// Define a GET endpoint for /
app.get('/', (req, res) => {
    // Send the register.html file as a response
    res.sendFile(path.join(__dirname, 'public', 'final.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signup', 'Register.html'));
});

// Define a POST endpoint for /register
app.post('/register', (req, res) => {
    // Get the username and password from the request body
    let username = req.body.username;
    let password = req.body.password;

    // Perform some server-side validation here

    // Read and write the credentials.json file using the helper function
    readWriteCredentials(username, password);
});

// Start the server and listen on the port number
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
