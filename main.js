const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');
const port = 3000;
const mainPath = path.join(__dirname,'..', 'main.js'); // Adjust the path as necessary
let serverProcess;

beforeAll((done) => {
  serverProcess = exec(`node ${mainPath} ./path-to-your-file`, (error) => {
    if (error) {
      console.error(`Could not start server: ${error}`);
      return done(error);
    }
    setTimeout(done, 1000); // Wait 1 second for the server to start
  });
});

afterAll(() => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

test('Server responds with "Hello, World!"', async () => {
  const response = await axios.get(`http://localhost:${port}`);
  expect(response.data).toBe('Hello, World!\n');
});