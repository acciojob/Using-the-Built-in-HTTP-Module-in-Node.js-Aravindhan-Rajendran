const http = require('http');
const fs = require('fs');
const path = require('path');

// Hardcode a file path for testing (ensure this file exists)
const filePath = path.join(__dirname, 'output.txt'); // Ensure this file exists

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

// Additional logging to indicate server readiness
console.log('Server has started and is ready to accept requests.');