const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS (if frontend and backend are on different domains)
app.use(cors());

// Sample registration route (POST /register)
app.post('/register', (req, res) => {
    const { username, password, dob } = req.body;

    // Check if all fields are provided
    if (!username || !password || !dob) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Simulate a registration process (e.g., save data to a database)
    // For this example, we'll just return a success message
    res.status(200).json({ message: 'Registration successful!' });
});

// Default route to check if server is working
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
