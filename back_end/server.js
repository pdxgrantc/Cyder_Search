// app.js
const express = require('express');
const app = express();
const port = 3000; // Change this to the desired port number (e.g., 8000, 8080, etc.)

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route handling
app.get('/', (req, res) => {
  res.sendFile('../front_end/build/index.html', { root: __dirname });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
