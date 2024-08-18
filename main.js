// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Check if the file path is provided
if (!filePath) {
  console.log('Please provide a file path as a command-line argument.');
  process.exit(1);
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request method is GET (you can add more validation if needed)
  if (req.method === 'GET') {
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // If an error occurs, respond with a 404 status and error message
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`Error: Could not read file. ${err.message}`);
      } else {
        // If file is read successfully, respond with the file content
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else {
    // If the request is not a GET request, respond with 405 Method Not Allowed
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
