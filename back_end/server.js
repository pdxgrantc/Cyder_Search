const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const port = 3000; // Change this to the desired port number (e.g., 8000, 8080, etc.)

// Serve static files from the "front_end/build" directory with custom MIME types
app.use(serveStatic('front_end/build', { 
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Route handling
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../front_end/build' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
