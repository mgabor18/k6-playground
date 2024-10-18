const express = require('express');
const app = express();

const waitTime = 100;
let iteration = 1;

// a simple GET endpint to give back a random [1-10] number
// it has an oversimplified authroization process
app.get('/random', (req, res) => {
  if (req.headers.authorization !== 'secret') {
    return res.status(401).json({ reason: 'Your token is invalid.' });
  }

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  setTimeout(() => {
    console.log(`API called. Simulating ${waitTime}ms before response. Iteration: ${iteration}`);
    iteration++;

    return res.json({ number: randomNumber });
  }, waitTime);
});

// an oversimplified auth endpoint to give back a simple string as a "token"
app.get('/auth', (req, res) => {
  return res.json({ token: 'secret' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
