const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory "database" for users and votes
let users = [];
let votes = [];

// POST route for user registration (same as before)
app.post('/register', (req, res) => {
    const { username, password, dob } = req.body;
    if (!username || !password || !dob) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "Username already taken!" });
    }

    // Hash the password (using bcrypt, for security purposes)
    users.push({ username, password, dob });
    console.log("Registered Users:", users);
    res.status(200).json({ message: "Registration successful!" });
});

// POST route for voting
app.post('/vote', (req, res) => {
    const { voteId } = req.body;

    if (!voteId) {
        return res.status(400).json({ error: "Please provide an ID to vote for!" });
    }

    // Add the vote to the votes array
    votes.push(voteId);
    console.log("Votes:", votes);  // Log all votes for debugging

    res.status(200).json({ message: `You have successfully voted for ID: ${voteId}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
