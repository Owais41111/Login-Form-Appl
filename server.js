const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., index.html, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Route: Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route: Handle signup
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    const entry = `SIGNUP - Name: ${name}, Email: ${email}, Password: ${password}\n`;
    fs.appendFile('logins.txt', entry, err => {
        if (err) {
            console.error('Error saving signup data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Signup data saved successfully!');
    });
});

// Route: Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const entry = `LOGIN - Email: ${email}, Password: ${password}\n`;
    fs.appendFile('logins.txt', entry, err => {
        if (err) {
            console.error('Error saving login data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Login data saved successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});
