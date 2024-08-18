const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Check if the file path is provided
if (!filePath) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
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
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});