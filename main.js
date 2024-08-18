const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Check if the file path is provided
if (!filePath) {
  console.error('Error: Please provide a file path as a command-line argument.');
  process.exit(1);
}

// Resolve the file path to ensure it is correct
const resolvedFilePath = path.resolve(filePath);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(resolvedFilePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error reading the file: ${err.message}`);
        console.error('Error reading the file:', err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid route. Please access the root path `/`.');
  }
});

const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error(`Could not start server: ${err.message}`);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${PORT}/`);
});