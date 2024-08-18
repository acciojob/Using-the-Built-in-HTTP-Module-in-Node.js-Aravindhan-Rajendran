const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Check if the file path is provided
if (!filePath) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1); // Exit if no file path is provided
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Only read the file if the request is to the root path
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error reading the file: ${err.message}`);
        console.error('Error reading the file:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  } else {
    // Handle any other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid route. Please access the root path `/`.');
  }
});

const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error(`Could not start server: ${err.message}`);
    process.exit(1); // Exit if the server fails to start
  }
  console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port.`);
  } else {
    console.error(`Server error: ${err.message}`);
  }
  process.exit(1); // Exit if there is a server error
});